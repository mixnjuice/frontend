import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as noteActions } from 'reducers/note';
import { getFlavorNote } from 'selectors/note';

export class Note extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    flavorId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      editingNote: false,
      notes: [],
      removed: [],
      usage: [],
      viewingNote: []
    };

    this.handleNoteEditor = this.handleNoteEditor.bind(this);
    this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
  }

  addNoteIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleNoteEditor(id, e)}
        className="text-success"
        icon="plus-square"
        size="2x"
        title="Add Flavor Note"
      />
    );
  }

  editNoteIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleNoteEditor(id, e)}
        className="text-success"
        icon="pen-square"
        size="2x"
        title="Edit Flavor Note"
      />
    );
  }

  handleNoteEditor(id) {
    if (id) {
      this.setState({ editingNote: id });
    } else {
      this.setState({ editingNote: false });
    }
  }

  handleNoteSubmit(values) {
    const { actions } = this.props;
    const { flavorId, note, update } = values;

    if (update === true) {
      actions.updateNote(values);
    } else {
      actions.createNote(values);
    }
    actions.requestNote({ flavorId });
    const notes = this.state.notes;

    notes[flavorId] = {
      note
    };
    this.setState({
      editingNote: false,
      ...notes
    });
  }

  noteEditor() {
    const { flavorId, userId } = this.props;
    const collection = this.props.note;

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(collection));
    let note = '';

    let update = false;

    if (collection[flavorId]) {
      note = collection[flavorId].note;
      update = true;
    }

    return (
      <FinalForm
        onSubmit={this.handleNoteSubmit}
        initialValues={{
          flavorId,
          note,
          update,
          userId
        }}
        render={({ handleSubmit, submitting }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            initialValues={{ flavorId, note, update, userId }}
          >
            <h3>Flavor Note:</h3>
            <Form.Row>
              <Field name="note">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <Form.Control
                        {...input}
                        as="textarea"
                        placeholder="Flavor Note"
                        style={{ 'min-height': '500px' }}
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="userId">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
              <Field name="flavorId">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
              <Field name="update">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <ButtonGroup>
                  <Button
                    className="button-animation"
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    <span>Save</span>
                  </Button>
                  <Button
                    onClick={e => this.handleNoteEditor(false, e)}
                    className="button-animation"
                    variant="danger"
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
    const { note, flavorId } = this.props;
    const { editingNote } = this.state;

    return (
      <Container>
        <h3>Flavor Notes</h3>
        {note[flavorId]
          ? this.editNoteIcon(flavorId)
          : this.addNoteIcon(flavorId)}
        {note[flavorId] ? note[flavorId].note : 'Add a note!'}
        {editingNote ? this.noteEditor(note[flavorId]) : ''}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  note: getFlavorNote(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...noteActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
