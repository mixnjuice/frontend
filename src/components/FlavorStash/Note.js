import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import unified from 'unified';
import parse from 'remark-parse';
import remark2react from 'remark-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, ButtonGroup, Col, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as noteActions } from 'reducers/note';
import { getFlavorNote, isLoading } from 'selectors/note';

export class Note extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      createNote: PropTypes.func.isRequired,
      deleteNote: PropTypes.func.isRequired,
      requestNote: PropTypes.func.isRequired,
      updateNote: PropTypes.func.isRequired
    }),
    flavorId: PropTypes.string.isRequired,
    loading: PropTypes.any.isRequired,
    note: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      editingNote: false,
      updatedNote: null
    };

    this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
  }

  componentDidMount() {
    const { actions, flavorId } = this.props;

    actions.requestNote({ flavorId });
  }

  addNoteIcon(id) {
    const { editingNote } = this.state;

    return (
      <Fragment>
        {!editingNote && (
          <Button
            className="button-animation"
            size="sm"
            onClick={() => this.handleNoteEditor(id)}
          >
            <FontAwesomeIcon icon="plus" size="sm" title="Add Flavor Note" />
          </Button>
        )}
      </Fragment>
    );
  }

  editNoteIcon(id) {
    const { editingNote } = this.state;

    return (
      <Fragment>
        {!editingNote && (
          <Button
            className="button-animation"
            size="sm"
            onClick={() => this.handleNoteEditor(id)}
          >
            <FontAwesomeIcon icon="pen" size="sm" title="Edit Flavor Note" />
          </Button>
        )}
      </Fragment>
    );
  }

  handleNoteEditor() {
    this.setState({ editingNote: !this.state.editingNote });
  }

  handleNoteSubmit(values) {
    const { actions } = this.props;
    const { note, update } = values;

    if (!note) {
      actions.deleteNote(values);
    } else if (update === true) {
      actions.updateNote(values);
    } else {
      actions.createNote(values);
    }
    this.setState({ updatedNote: note || '' });

    this.handleNoteEditor();
  }

  noteEditor() {
    const { flavorId, note, userId } = this.props;
    const { updatedNote } = this.state;
    const update = Boolean(note?.[flavorId]?.note);

    return (
      <FinalForm
        onSubmit={this.handleNoteSubmit}
        initialValues={{
          flavorId,
          note: updatedNote || note?.[flavorId]?.note,
          update,
          userId
        }}
        render={({ handleSubmit, submitting, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Field name="note">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <Form.Control
                        {...input}
                        as="textarea"
                        placeholder="Flavor Note"
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
            </Form.Row>
            {values?.note ? (
              <Form.Row>
                <h4>Preview:</h4>
                <Col md="12">
                  {
                    /* eslint-disable-next-line no-sync */
                    unified()
                      .use(parse)
                      .use(remark2react)
                      .processSync(values.note).result
                  }
                </Col>
              </Form.Row>
            ) : null}
            <Field name="userId">
              {({ input }) => <Form.Control {...input} type="hidden" />}
            </Field>
            <Field name="flavorId">
              {({ input }) => <Form.Control {...input} type="hidden" />}
            </Field>
            <Field name="update">
              {({ input }) => <Form.Control {...input} type="hidden" />}
            </Field>
            <Form.Row>
              <Form.Group>
                <ButtonGroup>
                  <Button
                    className="button-animation"
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    <FontAwesomeIcon icon="save" size="sm" />
                    &nbsp;<span>Save</span>
                  </Button>
                  <Button
                    onClick={e => this.handleNoteEditor(false, e)}
                    className="button-animation button--cancel"
                  >
                    <span>Cancel</span>
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      />
    );
  }

  render() {
    const { note, flavorId, loading } = this.props;
    const { editingNote } = this.state;
    const updatedNote = this.state.updatedNote;

    if (loading !== flavorId) {
      return (
        <Fragment>
          <h3>
            {note[flavorId] || updatedNote
              ? this.editNoteIcon(flavorId)
              : this.addNoteIcon(flavorId)}{' '}
            Flavor Notes
          </h3>
          {!editingNote && (note[flavorId] || updatedNote) ? (
            <Fragment>
              {
                /* eslint-disable-next-line no-sync */
                unified()
                  .use(parse)
                  .use(remark2react)
                  .processSync(updatedNote || note[flavorId].note).result
              }
            </Fragment>
          ) : null}
          {editingNote ? this.noteEditor() : null}
        </Fragment>
      );
    } else {
      return <Fragment>Loading...</Fragment>;
    }
  }
}

export const mapStateToProps = state => ({
  loading: isLoading(state),
  note: getFlavorNote(state)
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...noteActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
