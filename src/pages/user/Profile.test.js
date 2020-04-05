import React from 'react';
import renderer from 'react-test-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Profile } from './Profile';
import { withMemoryRouter } from 'utils/testing';

describe('<Profile />', () => {
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

  const RoutedProfile = withMemoryRouter(Profile);

  const props = {
    match,
    collection,
    actions,
    editing: false,
    loggedIn: true,
    currentUser: true
  };

  const component = renderer.create(<RoutedProfile {...props} />);

  const { instance } = component.root.findByType(Profile);

  it('renders visited user profile correctly', () => {
    const uprops = {
      ...props,
      match: {
        params: { id: 1, userName: 'david' },
        path: '/user/david'
      },
      currentUser: false
    };
    const tree = renderer.create(<RoutedProfile {...uprops} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders current user profile correctly', () => {
    const tree = renderer.create(<RoutedProfile {...props} />).toJSON;

    expect(tree).toMatchSnapshot();
  });

  it('can get gravatar', () => {
    expect(instance).toBeDefined();
    expect(instance.gravatar).toEqual(
      'https://www.gravatar.com/avatar/xxx?s=250'
    );
  });

  it('can get website', () => {
    expect(instance).toBeDefined();
    expect(instance.website).toEqual(
      <a href="//itsfreezing.com">itsfreezing.com</a>
    );
  });

  it('can get locationIcon', () => {
    expect(instance).toBeDefined();
    expect(instance.locationIcon).toEqual(<FontAwesomeIcon icon="city" />);
  });

  it('can get webIcon', () => {
    expect(instance).toBeDefined();
    expect(instance.webIcon).toEqual(<FontAwesomeIcon icon="globe" />);
  });

  it('can get bioIcon', () => {
    expect(instance).toBeDefined();
    expect(instance.bioIcon).toEqual(<FontAwesomeIcon icon="info-circle" />);
  });

  it('can handleEditor show', () => {
    expect(instance).toBeDefined();
    instance.handleEditor(true);
    expect(instance.state.editing).toEqual(true);
  });

  it('can handleEditor hide', () => {
    expect(instance).toBeDefined();
    instance.handleEditor(false);
    expect(instance.state.editing).toEqual(false);
  });

  it('can handleSubmit', () => {
    expect(instance).toBeDefined();
    const profile = {
      location: 'WhyNotMinot, CAN',
      bio: 'FA Cheez Whiz is my favorite.',
      url: 'itsfreezing.com'
    };

    instance.handleSubmit(profile);
    expect(actions.updateProfile).toBeCalledWith(profile);
    expect(instance.state.editing).toEqual(false);
  });

  it('can display profileEditor', () => {
    expect(instance.profileEditor).not.toBeNull();
  });
});
