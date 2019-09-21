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
  getDesiredNicotineStrength,
  getDesiredVolume
} from 'selectors/recipe.js';
import { getStash, isLoaded } from 'selectors/flavor';

export class RecipeEditor extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      requestStash: PropTypes.func.isRequired,
      setRecipeName: PropTypes.func.isRequired,
      setDesiredVolume: PropTypes.func.isRequired,
      setBaseDiluentRatio: PropTypes.func.isRequired,
      setDesiredDiluentRatio: PropTypes.func.isRequired,
      setBaseNicotineStrength: PropTypes.func.isRequired,
      setDesiredNicotineStrength: PropTypes.func.isRequired
    }).isRequired,
    stash: PropTypes.arrayOf(PropTypes.object),
    stashLoaded: PropTypes.bool,
    recipe: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    nicotineStrength: PropTypes.number.isRequired,
    desiredNicotineStrength: PropTypes.number.isRequired,
    desiredVolume: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
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
    const {
      recipe: { ingredients },
      stashLoaded,
      stash
    } = this.props;

    if (!stashLoaded) {
      return;
    }

    const existing = ingredients.find(ingredient => ingredient.mix_id === name);

    if (existing) {
      return;
    }

    const toAdd = stash.find(flavor => flavor.mix_id === name);

    ingredients.push(toAdd);
  }

  removeIngredient(event) {
    const { recipe } = this.props;
    const {
      target: { name }
    } = event;

    recipe.ingredients = recipe.ingredients.filter(
      ingredient => ingredient.mix_id !== name
    );
  }

  hasIngredient(event) {
    const {
      recipe: { ingredients }
    } = this.props;
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
    const { actions } = this.props;
    const {
      target: { name, value }
    } = event;

    switch (name) {
      case 'name':
        actions.setRecipeName(value);
        break;
      case 'desiredVolume': {
        const volume = parseInt(value, 10);

        if (volume) {
          actions.setDesiredVolume(volume);
        }
        break;
      }
      case 'baseNicotineStrength': {
        const strength = parseInt(value, 10);

        if (strength) {
          actions.setBaseNicotineStrength(strength);
        }
        break;
      }
      case 'desiredNicotineStrength': {
        const strength = parseInt(value, 10);

        if (strength) {
          actions.setDesiredNicotineStrength(strength);
        }
        break;
      }
      case 'baseDiluentRatio': {
        const ratio = parseFloat(value);

        if (ratio) {
          actions.setBaseDiluentRatio(ratio);
        }
        break;
      }
      case 'desiredDiluentRatio': {
        const ratio = parseFloat(value);

        if (ratio) {
          actions.setDesiredDiluentRatio(ratio);
        }
        break;
      }
      default:
        return;
    }
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
    const {
      recipe,
      stash,
      desiredVolume,
      desiredNicotineStrength,
      nicotineStrength
    } = this.props;
    const { name, ingredients } = recipe;

    const filteredStash = stash.filter(flavor => {
      const stashSlug = `${flavor.vendor.abbreviation} ${flavor.name}`.toLowerCase();

      return stashSlug.includes(this.state.searchStash.toLowerCase());
    });

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
                    <Form.Group as={Col} md="12" controlId="name">
                      <Form.Label>Recipe Name</Form.Label>
                      <Form.Control
                        name="name"
                        type="text"
                        value={name}
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
                    <Form.Group as={Col} md="4" controlId="desiredVolume">
                      <Form.Label>Batch Amount</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="desiredVolume"
                          type="number"
                          value={desiredVolume}
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
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="baseNicotineStrength"
                    >
                      <Form.Label>Base Strength</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="baseNicotineStrength"
                          type="number"
                          value={nicotineStrength}
                          onChange={this.handleUserInput}
                          placeholder="0"
                          required
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="amount-unit">
                            mg/ml
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="8">
                      <Form.Label>Nicotine PG/VG ratio</Form.Label>
                      <Field name="baseDiluentRatio" component={SplitSlider} />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="desiredNicotineStrength"
                    >
                      <Form.Label>Desired Strength</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="desiredNicotineStrength"
                          type="number"
                          value={desiredNicotineStrength}
                          onChange={this.handleUserInput}
                          placeholder="0"
                          required
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="amount-unit">
                            mg/ml
                          </InputGroup.Text>
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
                  <Container>
                    <Row>
                      <Col md="12">
                        <h2>Ingredients</h2>
                        <IngredientList
                          ingredients={ingredients}
                          onRemoveClick={this.removeIngredient}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
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
                                      {filteredStash.map(flavor => (
                                        <tr key={flavor.mix_id}>
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
                                      ))}
                                    </tbody>
                                  </Table>
                                </Fragment>
                              )}
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
              <Row>
                <Col md="12" className="border-top pt-2 text-right">
                  <Button
                    variant="danger"
                    className="button-animation mr-2"
                    type="submit"
                  >
                    Delete
                  </Button>
                  <Button className="button-animation" type="submit">
                    Save
                  </Button>
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
  desiredNicotineStrength: getDesiredNicotineStrength(state),
  desiredVolume: getDesiredVolume(state)
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
