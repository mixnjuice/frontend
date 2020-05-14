import React from 'react';
import renderer from 'react-test-renderer';
import { withMemoryRouter } from 'utils/testing';

import {
  FlavorStash,
  mapStateToProps,
  mapDispatchToProps
} from './FlavorStash';

jest.mock('components/ToggleButton/ToggleButton', () =>
  require('utils/testing').mockComponent('ToggleButton')
);

jest.mock('react-redux', () => {
  const { connect: rawConnect } = jest.requireActual('react-redux');

  return {
    connect: jest.fn(rawConnect)
  };
});

const RoutedFlavorStash = withMemoryRouter(FlavorStash);

describe('<FlavorStash />', () => {
  const actions = {
    addStash: jest.fn(),
    removeStash: jest.fn(),
    requestStash: jest.fn(),
    updateStash: jest.fn()
  };
  const props = {
    actions,
    stash: [
      {
        created: '2020-01-01',
        Flavor: { name: 'Sweet Cream', Vendor: { code: 'CAP' } }
      },
      {
        created: '2020-01-01',
        Flavor: { name: 'Tatanka', Vendor: { code: 'FLV' } }
      }
    ],
    stashLoaded: true
  };

  const component = renderer.create(<RoutedFlavorStash {...props} />);

  const { instance } = component.root.findByType(FlavorStash);

  it('can render', () => {
    const tree = renderer.create(<RoutedFlavorStash {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(actions.requestStash).not.toHaveBeenCalled();
  });

  it('can render with an empty stash', () => {
    const tree = renderer
      .create(<RoutedFlavorStash {...props} stash={[]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls requestStash on mount', () => {
    renderer.create(<RoutedFlavorStash {...props} stashLoaded={false} />);

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

  it('can handleAddToStash', () => {
    expect(instance).toBeDefined();
    instance.handleAddToStash(1);
    expect(actions.addStash).toBeCalledWith({ id: 1 });
    expect(instance.state.removed[1]).toEqual(false);
  });

  it('can handleRemoveFromStash', () => {
    expect(instance).toBeDefined();
    instance.handleRemoveFromStash(1);
    expect(actions.removeStash).toBeCalledWith({ id: 1 });
    expect(instance.state.removed[1]).toEqual(true);
  });

  it('can get expanded Icon', () => {
    expect(instance).toBeDefined();
    expect(instance.expandIcon(true)).toMatchSnapshot();
  });

  it('can get collapsed Icon', () => {
    expect(instance).toBeDefined();
    expect(instance.expandIcon(false)).toMatchSnapshot();
  });

  it('can get in stash button', () => {
    expect(instance).toBeDefined();
    expect(instance.stashButton(1, true)).toMatchSnapshot();
  });

  it('can get not in stash button', () => {
    expect(instance).toBeDefined();
    expect(instance.stashButton(1, false)).toMatchSnapshot();
  });

  it('can get stash edit icon', () => {
    expect(instance).toBeDefined();
    instance.state.editingStash = false;
    expect(instance.editIcon(1)).toMatchSnapshot();
  });

  it('can hide stash edit icon', () => {
    expect(instance).toBeDefined();
    instance.state.editingStash = 1;
    expect(instance.editIcon(1)).toMatchSnapshot();
  });

  it('can handle stash editor', () => {
    expect(instance).toBeDefined();
    instance.handleStashEditor(66);
    expect(instance.state.editingStash).toEqual(66);
  });

  it('can handleStashSubmit', () => {
    expect(instance).toBeDefined();
    const values = { flavorId: 14, minMillipercent: 1, maxMillipercent: 2 };

    instance.handleStashSubmit(values);
    expect(actions.updateStash).toBeCalledWith(values);
    expect(instance.state.editingStash).toEqual(false);
    expect(instance.state.usage[14]).toEqual({
      minMillipercent: 1,
      maxMillipercent: 2
    });
  });

  it('can expand flavor', () => {
    expect(instance).toBeDefined();
    instance.handleExpandFlavor({ flavorId: 19 });
    expect(instance.state.expanded[19]).toEqual(true);
  });

  it('can collapse flavor', () => {
    expect(instance).toBeDefined();
    instance.handleExpandFlavor({ flavorId: 19 });
    expect(instance.state.expanded[19]).toEqual(false);
  });

  it('can handleStashEditor', () => {
    expect(instance).toBeDefined();
    const values = { flavorId: 43, minMillipercent: 2, maxMillipercent: 4 };

    expect(instance.handleStashEditor(values)).toMatchSnapshot();
  });
});
