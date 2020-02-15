import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { initialState as initialProfileState } from 'reducers/profile';
import { initialState as initialAppState } from 'reducers/application';
import ConnectedProfile from './Profile';
import { withMemoryRouter } from 'utils';

describe('<Profile />', () => {
  const mockStore = configureStore();

  const match = { params: { id: 1 }, path: '/user/profile' };
  const collection = {
    name: 'mixn',
    userId: 10,
    location: 'WhyNotMinot, CAN',
    bio: 'FA Cheez Whiz is my favorite.'
  };
  const store = mockStore({
    profile: initialProfileState,
    application: initialAppState,
    match
  });
  const RoutedProfile = withMemoryRouter(ConnectedProfile);

  it('renders correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <RoutedProfile match={match} collection={collection} />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
