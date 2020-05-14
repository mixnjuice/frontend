import React from 'react';
import renderer from 'react-test-renderer';
import { withMemoryRouter } from 'utils/testing';

import { Note, mapStateToProps, mapDispatchToProps } from './Note';

jest.mock('react-redux', () => {
  const { connect: rawConnect } = jest.requireActual('react-redux');

  return {
    connect: jest.fn(rawConnect)
  };
});

const RoutedNote = withMemoryRouter(Note);

describe('<Note />', () => {
  const actions = {
    createNote: jest.fn(),
    deleteNote: jest.fn(),
    requestNote: jest.fn(),
    updateNote: jest.fn()
  };
  const props = {
    actions,
    flavorId: '23',
    loading: false,
    note: {
      23: {
        text: "It's dericious!"
      }
    },
    userId: '17'
  };

  const component = renderer.create(<RoutedNote {...props} />);

  const { instance } = component.root.findByType(Note);

  it('can render', () => {
    const tree = renderer.create(<RoutedNote {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(actions.requestNote).toHaveBeenCalled();
  });

  it('can render with an empty note', () => {
    const tree = renderer.create(<RoutedNote {...props} note={{}} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls requestStash on mount', () => {
    renderer.create(<RoutedNote {...props} stashLoaded={false} />);

    expect(actions.requestNote).toHaveBeenCalled();
  });

  it('can mapStateToProps', () => {
    const loading = false;
    const note = {};
    const state = {
      note: {
        collection: {},
        loading
      }
    };
    const expected = {
      note,
      loading
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('can mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const expected = {
      actions: expect.objectContaining({
        requestNote: expect.any(Function)
      })
    };

    expect(mapDispatchToProps(dispatch)).toEqual(expected);
  });

  it('can get note edit icon', () => {
    expect(instance).toBeDefined();
    instance.state.editingNote = false;
    expect(instance.editNoteIcon(2)).toMatchSnapshot();
  });

  it('can get add note icon', () => {
    expect(instance).toBeDefined();
    instance.state.editingNote = false;
    expect(instance.editNoteIcon(1)).toMatchSnapshot();
  });

  it('can handle note editor', () => {
    expect(instance).toBeDefined();
    instance.handleNoteEditor();
    expect(instance.state.editingNote).toEqual(true);
  });

  it('can handleNoteSubmit create', () => {
    expect(instance).toBeDefined();
    const values = { flavorId: 2, note: 'Yummy', update: false };

    instance.handleNoteEditor = jest.fn();
    instance.handleNoteSubmit(values);
    expect(actions.createNote).toBeCalledWith(values);
    expect(instance.state.updatedNote).toEqual('Yummy');
    expect(instance.handleNoteEditor).toHaveBeenCalled();
  });

  it('can handleNoteSubmit update', () => {
    expect(instance).toBeDefined();
    const values = { flavorId: 2, note: 'Yummy!', update: true };

    instance.handleNoteSubmit(values);
    expect(actions.updateNote).toBeCalledWith(values);
    expect(instance.state.updatedNote).toEqual('Yummy!');
    expect(instance.handleNoteEditor).toHaveBeenCalled();
  });

  it('can handleNoteSubmit delete', () => {
    expect(instance).toBeDefined();
    const values = { flavorId: 2, note: null, update: false };

    instance.handleNoteSubmit(values);
    expect(actions.deleteNote).toBeCalledWith(values);
    expect(instance.state.updatedNote).toEqual('');
    expect(instance.handleNoteEditor).toHaveBeenCalled();
  });
});
