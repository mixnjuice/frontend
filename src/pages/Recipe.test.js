import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState } from 'reducers';
import { Recipe } from './Recipe';
import recipes from '../data/recipes.json';

const mockStore = configureStore();
const store = mockStore({ application: initialState });

describe('<Recipe />', () => {
  const actions = {
    registerUser: jest.fn(),
    popToast: jest.fn()
  };
  const props = (search) => ({
    location: {
      search
    }
  });

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <Recipe appActions={actions} {...props('?id=1')} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can findRecipe', () => {
    const component = renderer.create(
      <Recipe appActions={actions} {...props('?id=1')} />
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

  it('handles favorite clicks', () => {
    const component = renderer.create(
      <Recipe appActions={actions} {...props('?id=1')} />
    );
    const { instance } = component.root.findByType(Recipe);

    instance.handleFavoriteClick();
    expect(instance.state.favoriteIcon).toEqual(['fas', 'heart']);
    expect(instance.state.favorited).toEqual(true);

    instance.handleFavoriteClick();
    expect(instance.state.favoriteIcon).toEqual(['far', 'heart']);
    expect(instance.state.favorited).toEqual(false);
  });

  it('handles rating clicks', () => {
    const component = renderer.create(
      <Recipe appActions={actions} {...props('?id=1')} />
    );
    const { instance } = component.root.findByType(Recipe);

    instance.handleRatingClick(2);
    expect(instance.state.rating).toEqual(2);
  });

  it('compares flavors against stash', () => {
    const component = renderer.create(
      <Recipe appActions={actions} {...props('?id=1')} />
    );
    const { instance } = component.root.findByType(Recipe);

    instance.compareWithStash();

    for (let i = 0; i < 4; i++) {
      expect(instance.state.flavors[i].inStash).toEqual(false);
    }
  });
});
