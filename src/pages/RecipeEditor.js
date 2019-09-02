import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Col,
  Container,
  InputGroup,
  Form,
  Row,
  Table
} from 'react-bootstrap';
import React, { Component, Fragment } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as recipeActions } from 'reducers/recipe';
import { actions as flavorActions } from 'reducers/flavor';
import SplitSlider from 'components/SplitSlider/SplitSlider';
import IngredientList from 'components/IngredientList/IngredientList';
import {
  getActiveRecipe,
  getNicotineStrength,
  getDesiredNicotineStrength
} from 'selectors/recipe.js';
import { getStash, isLoaded } from 'selectors/flavor';

export class RecipeEditor extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      requestStash: PropTypes.func.isRequired
    }).isRequired,
    stash: PropTypes.arrayOf(PropTypes.object),
    stashLoaded: PropTypes.bool,
    recipe: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ingredients: PropTypes.object.isRequired
    }),
    nicotineStrength: PropTypes.number.isRequired,
    desiredNicotineStrength: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      searchStash: '',
      showStash: false
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.toggleStashVisibility = this.toggleStashVisibility.bind(this);
  }

  componentDidMount() {
    const { stashLoaded, actions } = this.props;

    if (!stashLoaded) {
      actions.requestStash();
    }
  }

  toggleStashVisibility() {
    const { showStash } = this.state;

    this.setState({ showStash: !showStash });
  }

  addIngredient(event) {
    const {
      target: { name }
    } = event;
    const { ingredients, flavors } = this.state;
    const existing = ingredients.find(ingredient => ingredient.mix_id === name);

    if (existing) {
      return;
    }

    const toAdd = flavors.find(flavor => flavor.mix_id === name);

    ingredients.push(toAdd);

    this.setState({
      ingredients
    });
  }

  removeIngredient(event) {
    const { ingredients } = this.state;
    const {
      target: { name }
    } = event;

    this.setState({
      ingredients: ingredients.filter(ingredient => ingredient.mix_id !== name)
    });
  }

  hasIngredient(event) {
    const { ingredients } = this.state;
    const {
      target: { name }
    } = event;

    return ingredients.find(ingredient => ingredient.mix_id === name) !==
      undefined
      ? 'disabled'
      : null;
  }

  handleUserCheck(e) {
    const name = e.target.name;

    if (this.state[name] === true) {
      this.setState({ [name]: false });
    } else {
      this.setState({ [name]: true });
    }
  }

  handleUserInput(event) {
    const {
      target: { name, value }
    } = event;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });
  }

  render() {
    return (
      <Container className="recipe-editor">
        <Helmet title="Recipe Editor" />
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <h2>Basic Info</h2>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="recipeName">
                      <Form.Label>Recipe Name</Form.Label>
                      <Form.Control
                        name="recipeName"
                        type="text"
                        value={this.state.receipeName}
                        onChange={this.handleUserInput}
                        placeholder="Recipe Name"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a recipe name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <h2>Preparation</h2>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="amount">
                      <Form.Label>Batch Amount</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="amount"
                          type="number"
                          value={this.state.amount}
                          onChange={this.handleUserInput}
                          placeholder="0"
                          required
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="amount-unit">mL</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                          Please provide a batch amount.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="nicStrength">
                      <Form.Label>Base Strength</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="nicStrength"
                          type="number"
                          value={this.state.nicStrength}
                          onChange={this.handleUserInput}
                          placeholder="0"
                          required
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="amount-unit">mg</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="8">
                      <Form.Label>Nicotine PG/VG ratio</Form.Label>
                      <Field
                        name="nicotineDiluentRatio"
                        component={SplitSlider}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="desiredNicStrength">
                      <Form.Label>Desired Strength</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="desiredNicStrength"
                          type="number"
                          value={this.state.desiredNicStrength}
                          onChange={this.handleUserInput}
                          placeholder="0"
                          required
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="amount-unit">mg</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="8">
                      <Form.Label>Desired PG/VG ratio</Form.Label>
                      <Field
                        name="desiredDiluentRatio"
                        component={SplitSlider}
                      />
                    </Form.Group>
                  </Form.Row>
                </Col>
                <Col md="6">
                  <h2>Flavor Stash</h2>
                  <Button
                    variant="info"
                    className="button-animation"
                    size="sm"
                    onClick={this.toggleStashVisibility}
                  >
                    <span>{this.state.showStash ? 'Hide' : 'Show'}</span>
                  </Button>
                  <Container>
                    <Row>
                      <Col md="8">
                        {this.state.showStash && (
                          <Fragment>
                            <Form.Row>
                              <Form.Group
                                as={Col}
                                md="4"
                                controlId="searchStash"
                              >
                                <Form.Label>Search your stash</Form.Label>
                                <InputGroup>
                                  <Form.Control
                                    name="searchStash"
                                    type="text"
                                    placeholder="TFA Bacon"
                                    onChange={this.handleUserInput}
                                  />
                                </InputGroup>
                              </Form.Group>
                            </Form.Row>
                            <Table size="sm" borderless striped>
                              <tbody>
                                {this.state.stash.map((flavor, index) => {
                                  if (
                                    flavor.name
                                      .toLowerCase()
                                      .includes(
                                        this.state.searchStash.toLowerCase()
                                      ) ||
                                    (
                                      flavor.vendor.abbreviation +
                                      ' ' +
                                      flavor.name
                                    )
                                      .toLowerCase()
                                      .includes(
                                        this.state.searchStash.toLowerCase()
                                      )
                                  ) {
                                    return (
                                      <tr key={index}>
                                        <td>{flavor.vendor.name}</td>
                                        <td>{flavor.name}</td>
                                        <td>
                                          <Button
                                            className="button-animation"
                                            onClick={this.addIngredient}
                                            name={flavor.mix_id}
                                          >
                                            <FontAwesomeIcon icon="plus" />
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                })}
                              </tbody>
                            </Table>
                          </Fragment>
                        )}
                      </Col>
                    </Row>
                  </Container>
                  <Container>
                    <Row>
                      <Col md="8">
                        <h2>Ingredients</h2>
                        <IngredientList
                          ingredients={this.state.ingredients}
                          onRemoveClick={this.removeIngredient}
                        />
                      </Col>
                    </Row>
                  </Container>
                  <Form.Row>
                    <Form.Group as={Col} md="2">
                      <Button className="button-animation" type="submit">
                        <span>Save</span>
                      </Button>
                      &nbsp;
                    </Form.Group>
                  </Form.Row>
                </Col>
              </Row>
            </form>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stash: getStash(state),
  stashLoaded: isLoaded(state),
  recipe: getActiveRecipe(state),
  nicotineStrength: getNicotineStrength(state),
  desiredNicotineStrength: getDesiredNicotineStrength(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...recipeActions,
      ...flavorActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeEditor);
