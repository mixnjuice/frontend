import React from 'react';
import renderer from 'react-test-renderer';

import {
  FlavorStash,
  mapStateToProps,
  mapDispatchToProps
} from './FlavorStash';

jest.mock('react-redux', () => {
  const { connect: rawConnect } = jest.requireActual('react-redux');

  return {
    connect: jest.fn(rawConnect)
  };
});

describe('<FlavorStash />', () => {
  const actions = {
    requestStash: jest.fn()
  };
  const props = {
    actions,
    stash: [
      { Flavor: { name: 'Sweet Cream', Vendor: { code: 'CAP' } } },
      { Flavor: { name: 'Tatanka', Vendor: { code: 'FLV' } } }
    ],
    stashLoaded: true
  };

  it('can render', () => {
    const tree = renderer.create(<FlavorStash {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(actions.requestStash).not.toHaveBeenCalled();
  });

  it('can render with an empty stash', () => {
    const tree = renderer
      .create(<FlavorStash {...props} stash={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls requestStash on mount', () => {
    renderer.create(<FlavorStash {...props} stashLoaded={false} />);

    expect(actions.requestStash).toHaveBeenCalled();
  });

  it('can mapStateToProps', () => {
    const stash = [];
    const loaded = true;
    const state = {
      flavor: {
        stash,
        loaded
      }
    };
    const expected = {
      stash,
      stashLoaded: loaded
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('can mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const expected = {
      actions: expect.objectContaining({
        requestStash: expect.any(Function)
      })
    };

    expect(mapDispatchToProps(dispatch)).toEqual(expected);
  });
});
