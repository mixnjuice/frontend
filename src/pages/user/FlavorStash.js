import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap';
import ToggleButton from 'components/ToggleButton/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as flavorActions } from 'reducers/flavor';
import { getFlavorNote } from 'selectors/note';
import { getStash } from 'selectors/flavor';
import Note from 'components/FlavorStash/Note';

export class FlavorStash extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    stash: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: {},
      editingStash: false,
      editingNote: false,
      notes: {},
      removed: {},
      usage: {},
      viewingNote: {}
    };

    this.handleRemoveFromStash = this.removeFromStash.bind(this);
    this.handleAddToStash = this.addToStash.bind(this);
    this.handleStashEditor = this.handleStashEditor.bind(this);
    this.handleExpandFlavor = this.expandFlavor.bind(this);
    this.handleNoteViewer = this.handleNoteViewer.bind(this);
    this.handleStashSubmit = this.handleStashSubmit.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestStash();
  }

  date(d) {
    const s = new Date(d);

    return s.toLocaleDateString();
  }

  addToStash(id) {
    const { actions } = this.props;
    const { removed } = this.state;

    actions.addStash({ id });
    removed[id] = false;
    this.setState({ removed });
  }

  removeFromStash(id) {
    const { actions } = this.props;
    const { removed } = this.state;

    actions.removeStash({ id });
    removed[id] = true;
    this.setState({ removed });
  }

  stashIcon(id, has) {
    return (
      <ToggleButton
        value={has}
        onClick={
          has
            ? e => this.handleRemoveFromStash(id, e)
            : e => this.handleAddToStash(id, e)
        }
        title={has ? 'Remove from Stash' : 'Add to Stash'}
        variant="check"
      />
    );
  }

  noteIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleNoteViewer(id, e)}
        className="text-primary"
        icon="sticky-note"
        size="2x"
        title="Flavor Note"
      />
    );
  }

  notesIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleAddToStash(id, e)}
        className="text-warning"
        icon="book"
        size="2x"
        title="Flavor Notes"
      />
    );
  }

  editIcon(id) {
    const { editingStash } = this.state;

    return (
      <Fragment>
        {!editingStash && (
          <FontAwesomeIcon
            onClick={e => this.handleStashEditor(id, e)}
            className="text-info"
            icon="pen-square"
            size="2x"
            title="Edit Details"
          />
        )}
      </Fragment>
    );
  }

  handleStashEditor(id) {
    if (id) {
      this.setState({ editingStash: id });
    } else {
      this.setState({ editingStash: false });
    }
  }

  handleStashSubmit(values) {
    const { actions } = this.props;
    const { flavorId, minMillipercent, maxMillipercent } = values;

    actions.updateStash(values);
    const usage = this.state.usage;

    usage[flavorId] = {
      minMillipercent,
      maxMillipercent
    };
    this.setState({
      editingStash: false,
      ...usage
    });
  }

  expandFlavor(flavor) {
    const { expanded } = this.state;
    const { flavorId } = flavor;

    if (expanded[flavorId]) {
      expanded[flavorId] = false;
    } else {
      expanded[flavorId] = true;
    }
    this.setState({ expanded });
  }

  stashEditor(flavor) {
    const { flavorId, maxMillipercent, minMillipercent } = flavor;

    return (
      <FinalForm
        onSubmit={this.handleStashSubmit}
        initialValues={{
          flavorId,
          maxMillipercent: maxMillipercent / 1000,
          minMillipercent: minMillipercent / 1000
        }}
        render={({ handleSubmit, submitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h3>Usage Range:</h3>
            <Form.Row>
              <Field name="minMillipercent">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          Min
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control {...input} type="number" step="0.1" />
                      <InputGroup.Text id="inputGroupAppend">%</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="maxMillipercent">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          Max
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control {...input} type="number" step="0.1" />
                      <InputGroup.Text id="inputGroupAppend">%</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="flavorId">
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
                    onClick={e => this.handleStashEditor(false, e)}
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

  handleNoteViewer(id) {
    const viewingNote = this.state.viewingNote;

    if (id) {
      viewingNote[id] = true;
    } else {
      viewingNote[id] = false;
    }
    this.setState({ ...viewingNote });
  }

  render() {
    const { stash } = this.props;
    const { editingStash, removed, usage, expanded } = this.state;

    return (
      <Container>
        <Helmet title="Your Flavor Stash" />
        <Row className="text-center">
          <Col>
            <h1>Flavor Stash</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {stash.map((flavor, index) => {
              const minMillipercent = flavor.minMillipercent / 1000;
              const maxMillipercent = flavor.maxMillipercent / 1000;
              const milliPercents = usage[flavor.flavorId]
                ? `${usage[flavor.flavorId].minMillipercent} - ${
                    usage[flavor.flavorId].maxMillipercent
                  }`
                : `${minMillipercent} - ${maxMillipercent}`;

              return (
                <Card key={index} className="mb-2">
                  <Card.Header>
                    <Row>
                      <Col>
                        <h3>
                          <a
                            href="#expand"
                            onClick={e => this.handleExpandFlavor(flavor, e)}
                          >
                            {flavor.Flavor.name} ({flavor.Flavor.Vendor.code})
                          </a>
                        </h3>
                      </Col>
                      {!expanded[flavor.flavorId] && (
                        <Col className="text-center">
                          <h4>
                            <strong>Use:</strong> {milliPercents}%
                          </h4>
                        </Col>
                      )}
                      <Col className="text-right">
                        <h5>Added: {this.date(flavor.created)}</h5>
                      </Col>
                    </Row>
                    {!expanded[flavor.flavorId] && (
                      <Row>
                        <Col>
                          {this.stashIcon(
                            flavor.flavorId,
                            Boolean(!removed[flavor.flavorId])
                          )}
                        </Col>
                      </Row>
                    )}
                  </Card.Header>
                  {expanded[flavor.flavorId] && (
                    <Fragment>
                      <Card.Body>
                        <Card.Title>{flavor.Flavor.Vendor.name}</Card.Title>

                        <Row>
                          <Col>
                            <strong>Density:</strong>{' '}
                            {flavor.Flavor.density || 'Not Available'}
                          </Col>
                          <Col>
                            {this.editIcon(flavor.flavorId)}{' '}
                            <strong>Use:</strong> {milliPercents}%
                          </Col>
                        </Row>

                        {editingStash === flavor.flavorId
                          ? this.stashEditor(flavor)
                          : ''}

                        <Note
                          flavorId={flavor.flavorId}
                          userId={flavor.userId}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <span className="float-left">
                          {this.stashIcon(
                            flavor.flavorId,
                            Boolean(!removed[flavor.flavorId])
                          )}{' '}
                          {this.noteIcon(flavor.flavorId)}{' '}
                          {this.notesIcon(flavor.flavorId)}
                        </span>
                        <span className="float-right">
                          ID: {flavor.flavorId}
                        </span>
                      </Card.Footer>
                    </Fragment>
                  )}
                </Card>
              );
            })}
            {!stash[0] && <div>Shit!</div>}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stash: getStash(state),
  notes: getFlavorNote(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...flavorActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FlavorStash);
