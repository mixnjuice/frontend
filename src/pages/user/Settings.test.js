import React from 'react';
import renderer from 'react-test-renderer';
import { UserSettings } from './Settings';

describe('<UserSettings />', () => {
  const actions = {
    toggleDarkMode: jest.fn()
  };
  const props = {
    theme: 'default',
    actions
  };

  it('renders correctly', () => {
    expect(
      renderer.create(<UserSettings {...props} />).toJSON()
    ).toMatchSnapshot();
  });

  it('renders correctly with dark mode enabled', () => {
    expect(
      renderer.create(<UserSettings {...props} theme="dark" />).toJSON()
    ).toMatchSnapshot();
  });
});
