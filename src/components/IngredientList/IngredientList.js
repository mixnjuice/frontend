import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, InputGroup, Form } from 'react-bootstrap';

import { actions as recipeActions } from 'reducers/recipe';

export default function IngredientList({ ingredients, percentages }) {
  const dispatch = useDispatch();

  const handlePercentChange = useCallback(
    (event) => {
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
        dispatch(
          recipeActions.setRecipePercentages({
            ...percentages,
            [name]: floatValue
          })
        );
      }
    },
    [dispatch, ingredients, percentages]
  );

  const removeIngredient = useCallback(
    (id) => {
      dispatch(
        recipeActions.setRecipeIngredients(
          ingredients.filter((ingredient) => ingredient.Flavor.id !== id)
        )
      );
    },
    [dispatch, ingredients]
  );

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
                    onChange={handlePercentChange}
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
                  onClick={() => removeIngredient(id)}
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

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  percentages: PropTypes.object.isRequired
};

IngredientList.defaultProps = {
  ingredients: [],
  percentages: []
};
