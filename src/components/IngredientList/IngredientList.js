import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, InputGroup, Form } from 'react-bootstrap';

import { actions as recipeActions } from 'reducers/recipe';

export class IngredientList extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      setRecipeIngredients: PropTypes.func.isRequired,
      setRecipePercentages: PropTypes.func.isRequired
    }),
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    percentages: PropTypes.arrayOf(PropTypes.number).isRequired
  };

  static defaultProps = {
    ingredients: [],
    percentages: []
  };

  constructor(props) {
    super(props);

    this.removeIngredient = this.removeIngredient.bind(this);
    this.handlePercentChange = this.handlePercentChange.bind(this);
  }

  removeIngredient(id) {
    const { ingredients, actions } = this.props;

    actions.setRecipeIngredients(
      ingredients.filter((ingredient) => ingredient.Flavor.id !== id)
    );
  }

  handlePercentChange(event) {
    const { actions, ingredients, percentages } = this.props;
    const {
      target: { name, value }
    } = event;

    const floatValue = parseFloat(value);

    if (floatValue === false) {
      return;
    }

    const index = ingredients.findIndex(
      (ingredient) => ingredient.Flavor.id === name
    );

    if (index > -1) {
      actions.setRecipePercentages({ ...percentages, [name]: floatValue });
    }
  }

  render() {
    const { ingredients } = this.props;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return <div>No ingredients!</div>;
    }

    return (
      <Table striped className="ingredient-list">
        <tbody>
          {ingredients.map((ingredient) => {
            const {
              flavorId: id,
              Flavor: { name, Vendor: vendor }
            } = ingredient;

            return (
              <tr key={id}>
                <td>
                  {vendor.code} {name}
                </td>
                <td className="recipe-percent">
                  <InputGroup>
                    <Form.Control
                      step="0.1"
                      name={id}
                      type="number"
                      value={ingredient.percentage}
                      onChange={this.handlePercentChange}
                      placeholder="0"
                      required
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
                <td className="text-right">
                  <Button
                    size="sm"
                    className="button-animation"
                    onClick={() => this.removeIngredient(id)}
                  >
                    <FontAwesomeIcon icon="trash" size="xs" title="remove" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(recipeActions, dispatch)
});

export default connect(null, mapDispatchToProps)(IngredientList);
