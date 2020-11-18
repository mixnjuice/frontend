import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';

import { actions as recipeActions } from 'reducers/recipe';

import IngredientList from './IngredientList';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => dispatch)
  };
});

describe('<IngredientList />', () => {
  const props = {
    ingredients: [
      {
        flavorId: 'A',
        Flavor: { id: 'A', name: 'A_NAME', Vendor: { code: 'A_VENDOR' } }
      },
      {
        flavorId: 'B',
        Flavor: { id: 'B', name: 'B_NAME', Vendor: { code: 'B_VENDOR' } }
      },
      {
        flavorId: 'C',
        Flavor: { id: 'C', name: 'C_NAME', Vendor: { code: 'C_VENDOR' } }
      }
    ],
    percentages: {
      A: 0,
      B: 0,
      C: 0
    }
  };

  it('renders correctly', () => {
    const { asFragment } = render(<IngredientList {...props} />);

    useDispatch.mockReturnValue(jest.fn());

    expect(asFragment()).toMatchSnapshot();
  });

  it('calls dispatch for percentage change', () => {
    const { getByTestId } = render(<IngredientList {...props} />);

    expect(getByTestId('ingredient-A-percent')).not.toBeNull();

    fireEvent.change(getByTestId('ingredient-A-percent'), {
      target: { name: 'A', value: '5.0' }
    });

    expect(useDispatch()).toHaveBeenCalledWith(
      recipeActions.setRecipePercentages({
        ...props.percentages,
        A: 5.0
      })
    );
  });

  it('calls dispatch to remove from list', () => {
    const { getByTestId } = render(<IngredientList {...props} />);

    expect(getByTestId('ingredient-C-remove')).not.toBeNull();

    fireEvent.click(getByTestId('ingredient-C-remove'));

    expect(useDispatch()).toHaveBeenCalledWith(
      recipeActions.setRecipeIngredients(
        props.ingredients.filter((ingredient) => ingredient.Flavor.id !== 'C')
      )
    );
  });
});
