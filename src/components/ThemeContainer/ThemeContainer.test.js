import React from 'react';
import renderer from 'react-test-renderer';
import ConnectedThemeContainer, { ThemeContainer } from './ThemeContainer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from 'reducers/theme';

describe('<ThemeContainer />', () => {
  const props = {
    theme: 'default'
  };

  const mockStore = configureStore();
  const store = mockStore({ theme: initialState });

  it('renders correctly', () => {
    const component = renderer.create(<ThemeContainer {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders connected component correctly', () => {
    const component = renderer.create(
      <Provider store={store}>
        <ConnectedThemeContainer />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('handles componentDidUpdate correctly', () => {
    const component = renderer.create(<ThemeContainer {...props} />);

    component.update(<ThemeContainer theme="dark" />);

    expect(document.body.classList.item(0)).toEqual('theme--dark');
    expect(document.body.classList.length).toEqual(1);

    component.update(<ThemeContainer theme="default" />);
    expect(document.body.classList.item(0)).toEqual('theme--default');
    expect(document.body.classList.length).toEqual(1);
  });
});
