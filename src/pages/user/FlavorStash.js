import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
import { getStash, isLoaded } from 'selectors/flavor';
import Note from 'components/FlavorStash/Note';

export class FlavorStash extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      addStash: PropTypes.func.isRequired,
      removeStash: PropTypes.func.isRequired,
      requestStash: PropTypes.func.isRequired,
      updateStash: PropTypes.func.isRequired
    }),
    stash: PropTypes.array.isRequired,
    stashLoaded: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: {},
      editingStash: false,
      removed: {},
      usage: {}
    };

    this.handleRemoveFromStash = this.removeFromStash.bind(this);
    this.handleAddToStash = this.addToStash.bind(this);
    this.handleStashEditor = this.handleStashEditor.bind(this);
    this.handleExpandFlavor = this.expandFlavor.bind(this);
    this.handleStashSubmit = this.handleStashSubmit.bind(this);
  }

  componentDidMount() {
    const { stashLoaded, actions } = this.props;

    if (!stashLoaded) {
      actions.requestStash();
    }
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

  expandIcon(expanded) {
    return (
      <FontAwesomeIcon
        rotation={expanded ? 90 : 270}
        icon="chevron-left"
        className={`mr-2 ${expanded ? 'arrow--up' : 'arrow--down'}`}
      />
    );
  }

  stashButton(id, has) {
    return (
      <ToggleButton
        value={has}
        onClick={
          has
            ? () => this.handleRemoveFromStash(id)
            : () => this.handleAddToStash(id)
        }
        title={has ? 'Remove from Stash' : 'Add to Stash'}
        variant="check"
      />
    );
  }

  editIcon(id) {
    const { editingStash } = this.state;

    return (
      <Fragment>
        {!editingStash ? (
          <Button
            className="button-animation"
            size="sm"
            onClick={(e) => this.handleStashEditor(id, e)}
          >
            <FontAwesomeIcon icon="pen" size="sm" title="Edit Details" />
          </Button>
        ) : null}
      </Fragment>
    );
  }

  handleStashEditor(id) {
    this.setState({ editingStash: id ? id : false });
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

    expanded[flavorId] = !expanded?.[flavorId];

    this.setState({ expanded });
  }

  stashEditor(flavor) {
    const { flavorId, maxMillipercent, minMillipercent } = flavor;
    const { usage } = this.state;

    return (
      <FinalForm
        onSubmit={this.handleStashSubmit}
        initialValues={{
          flavorId,
          maxMillipercent:
            usage?.[flavorId]?.maxMillipercent || maxMillipercent / 1000,
          minMillipercent:
            usage?.[flavorId]?.minMillipercent || minMillipercent / 1000
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
                      <InputGroup.Text>%</InputGroup.Text>
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
                      <InputGroup.Text>%</InputGroup.Text>
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
                    <FontAwesomeIcon icon="save" size="sm" />
                    &nbsp;<span>Save</span>
                  </Button>
                  <Button
                    onClick={(e) => this.handleStashEditor(false, e)}
                    className="button-animation button--cancel"
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
                <Card key={index} className="mb-1">
                  <Card.Body
                    className="border-bottom cursor--pointer"
                    onClick={(e) => this.handleExpandFlavor(flavor, e)}
                  >
                    <Row>
                      <Col>
                        <h3
                          id={`flavor-${flavor.flavorId}`}
                          className={
                            expanded[flavor.flavorId] ? 'text--primary' : null
                          }
                        >
                          {this.expandIcon(Boolean(expanded[flavor.flavorId]))}{' '}
                          {flavor.Flavor.name} ({flavor.Flavor.Vendor.code})
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
                  </Card.Body>

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
                        <hr />
                        <Note
                          flavorId={flavor.flavorId}
                          userId={flavor.userId}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <span className="float-left">
                          ID: {flavor.flavorId}
                        </span>
                        <span className="float-right">
                          {this.stashButton(
                            flavor.flavorId,
                            Boolean(!removed[flavor.flavorId])
                          )}
                        </span>
                      </Card.Footer>
                    </Fragment>
                  )}
                </Card>
              );
            })}
            {!stash[0] && (
              <Col className="text-center">
                Navigate to{' '}
                <Link to="/flavors" title="Flavors">
                  Flavors
                </Link>{' '}
                to add to your Flavor Stash.
              </Col>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export const mapStateToProps = (state) => ({
  stash: getStash(state),
  stashLoaded: isLoaded(state)
});

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(flavorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FlavorStash);
