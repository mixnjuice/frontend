import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers/application';
import { Recipe } from './Recipe';
import recipes from '../data/recipes.json';

const mockStore = configureStore();
const store = mockStore({ application: initialState });

describe('<Recipe />', () => {
  const actions = {
    registerUser: jest.fn()
  };
  const props = search => ({
    location: {
      search
    }
  });

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Recipe {...props('?id=1')} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can findRecipe', () => {
    const component = renderer.create(
      <Recipe actions={actions} {...props('?id=1')} />
    );
    const { instance } = component.root.findByType(Recipe);

    expect(instance).toBeDefined();
    instance.findRecipe();
    expect(instance.state).toEqual({
      ...recipes[0],
      flavorTotal: 9,
      favoriteIcon: ['far', 'heart'],
      favorited: false,
      rating: 0
    });
  });
});
