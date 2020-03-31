import React from 'react';
import renderer from 'react-test-renderer';
import { UserSettings } from './Settings';
import { withMemoryRouter } from 'utils';

describe('<UserSettings />', () => {
  const actions = {
    toggleDarkMode: jest.fn()
  };
  const props = {
    theme: 'default',
    actions
  };

  const RoutedUserSettings = withMemoryRouter(UserSettings);

  it('renders correctly', () => {
    expect(
      renderer.create(<RoutedUserSettings {...props} />).toJSON()
    ).toMatchSnapshot();
  });
});
