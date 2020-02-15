import React from 'react';
import renderer from 'react-test-renderer';
// import configureStore from 'redux-mock-store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Profile } from './Profile';
import { withMemoryRouter } from 'utils';

describe('<Profile />', () => {
  // const mockStore = configureStore();

  const match = { params: { id: 1 }, path: '/user/profile' };
  const collection = {
    name: 'mixn',
    userId: 10,
    location: 'WhyNotMinot, CAN',
    bio: 'FA Cheez Whiz is my favorite.',
    url: 'itsfreezing.com',
    gravatar: 'xxx'
  };
  const actions = {
    requestCurrentUserProfile: jest.fn(),
    requestProfile: jest.fn(),
    updateProfile: jest.fn()
  };
  /* const store = mockStore({
    profile: initialProfileState,
    application: initialAppState,
    match
  });*/

  const props = {
    match,
    collection,
    actions,
    editting: false,
    loggedIn: true,
    currentUser: true
  };
  const RoutedProfile = withMemoryRouter(Profile);

  it('renders correctly', () => {
    const component = renderer.create(<RoutedProfile {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can get gravatar', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    expect(instance.Gravatar).toEqual(
      'https://www.gravatar.com/avatar/xxx?s=250'
    );
  });

  it('can get website', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    expect(instance.Website).toEqual(
      <a href="//itsfreezing.com">itsfreezing.com</a>
    );
  });

  it('can get locationIcon', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    expect(instance.locationIcon).toEqual(<FontAwesomeIcon icon="city" />);
  });

  it('can get webIcon', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    expect(instance.webIcon).toEqual(<FontAwesomeIcon icon="globe" />);
  });

  it('can get biocon', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    expect(instance.bioIcon).toEqual(<FontAwesomeIcon icon="info-circle" />);
  });

  it('can handleEditor show', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    instance.handleEditor(true);
    expect(instance.state.editting).toEqual(true);
  });

  it('can handleEditor hide', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    instance.handleEditor(false);
    expect(instance.state.editting).toEqual(false);
  });

  it('can handleSubmit', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
    instance.handleSubmit({
      location: 'WhyNotMinot, CAN',
      bio: 'FA Cheez Whiz is my favorite.',
      url: 'itsfreezing.com'
    });
    expect(actions.updateProfile).toBeCalledWith({
      location: 'WhyNotMinot, CAN',
      bio: 'FA Cheez Whiz is my favorite.',
      url: 'itsfreezing.com'
    });
    expect(instance.state.editting).toEqual(false);
  });

  it('can display profileEditor', () => {
    const component = renderer.create(<RoutedProfile {...props} />);
    const { instance } = component.root.findByType(Profile);

    expect(instance).toBeDefined();
  });
});
