import React from 'react';
import renderer from 'react-test-renderer';
import { UserSettings } from './Settings';
import { withMemoryRouter } from 'utils';

describe('<UserSettings />', () => {
  const actions = {
    setTheme: jest.fn()
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

  it('can setTheme', () => {
    const component = renderer.create(<RoutedUserSettings {...props} />);
    const { instance } = component.root.findByType(UserSettings);

    expect(instance).toBeDefined();

    instance.toggleDarkMode();
    expect(actions.setTheme).toHaveBeenCalledWith('dark');

    component.update(<RoutedUserSettings {...props} theme="dark" />);
    instance.toggleDarkMode();
    expect(actions.setTheme).toHaveBeenCalledWith('default');
  });
});
