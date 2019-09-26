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
      setRecipeIngredients: PropTypes.func.isRequired
    }),
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveClick: PropTypes.func
  };

  static defaultProps = {
    ingredients: []
  };

  constructor(props) {
    super(props);

    this.removeIngredient = this.removeIngredient.bind(this);
    this.handlePercentChange = this.handlePercentChange.bind(this);
  }

  removeIngredient(event) {
    const { ingredients, actions } = this.props;
    const {
      target: { name }
    } = event;

    actions.setRecipeIngredients(
      ingredients.filter(ingredient => ingredient.id !== name)
    );
  }

  handlePercentChange(event) {
    const { ingredients } = this.props;
    const {
      target: { name, value }
    } = event;

    const toUpdate = ingredients.find(ingredient => ingredient.id === name);

    if (toUpdate) {
      toUpdate.millipercent = value;
    }
  }

  render() {
    const { ingredients, onRemoveClick } = this.props;

    return (
      <Table striped className="ingredient-list">
        <tbody>
          {ingredients.map(ingredient => {
            const {
              flavorId: id,
              Flavor: { name, Vendor: vendor }
            } = ingredient;

            return (
              <tr key={id}>
                <td>
                  {vendor.name} {name}
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
                <td>
                  <Button
                    size="sm"
                    className="button-animation"
                    onClick={onRemoveClick}
                  >
                    <FontAwesomeIcon icon="trash" size="xs" />
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(recipeActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(IngredientList);
