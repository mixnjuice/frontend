import { reducer, types, actions } from './note';

describe('note reducer', () => {
  const note = {
    flavorId: '4',
    note: 'Four sho',
    UserId: '1'
  };

  const flavorNote = {
    flavorId: '4',
    note: 'Four sho',
    UserId: '1'
  };

  const error = { message: 'Failed' };

  const flavorId = 1;

  it('has REQUEST_LOADING action', () => {
    expect(actions.requestLoading(flavorId)).toEqual({
      type: types.REQUEST_LOADING,
      flavorId
    });
  });

  it('reduces REQUEST_LOADING action', () => {
    const action = actions.requestLoading(flavorId);

    expect(reducer({}, action)).toEqual({ loading: flavorId });
  });

  it('has REQUEST_NOTE_SUCCESS action', () => {
    expect(actions.requestNoteSuccess(note)).toEqual({
      type: types.REQUEST_NOTE_SUCCESS,
      note
    });
  });

  it('reduces REQUEST_NOTE_SUCCESS action', () => {
    const action = actions.requestNoteSuccess(note);

    expect(reducer({}, action)).toEqual({ collection: note, loading: false });
  });

  it('has CREATE_NOTE action', () => {
    expect(actions.createNote(note)).toEqual({
      type: types.CREATE_NOTE,
      flavorNote
    });
  });

  it('reduces CREATE_NOTE action', () => {
    const action = actions.createNote(flavorNote);

    expect(reducer({}, action)).toEqual({});
  });

  it('has DELETE_NOTE action', () => {
    expect(actions.deleteNote(flavorNote)).toEqual({
      type: types.DELETE_NOTE,
      flavorNote
    });
  });

  it('reduces DELETE_NOTE action', () => {
    const action = actions.deleteNote(flavorNote);

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_NOTE action', () => {
    expect(actions.updateNote(flavorNote)).toEqual({
      type: types.UPDATE_NOTE,
      flavorNote
    });
  });

  it('reduces UPDATE_NOTE action', () => {
    const action = actions.updateNote(flavorNote);

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_NOTE_SUCCESS action', () => {
    expect(actions.updateNoteSuccess(flavorId)).toEqual({
      type: types.UPDATE_NOTE_SUCCESS,
      flavorId
    });
  });

  it('reduces UPDATE_NOTE_SUCCESS action', () => {
    const action = actions.updateNoteSuccess(flavorId);

    expect(reducer({}, action)).toEqual({ collection: { [flavorId]: null } });
  });

  it('has REQUEST_NOTE_FAILURE action', () => {
    expect(actions.requestNoteFailure(error)).toEqual({
      type: types.REQUEST_NOTE_FAILURE,
      error
    });
  });

  it('reduces REQUEST_NOTE_FAILURE action', () => {
    const action = actions.requestNoteFailure(error);

    expect(reducer({}, action)).toEqual({ error });
  });

  it('has CREATE_NOTE_FAILURE action', () => {
    expect(actions.createNoteFailure(error)).toEqual({
      type: types.CREATE_NOTE_FAILURE,
      error
    });
  });

  it('reduces CREATE_NOTE_FAILURE action', () => {
    const action = actions.createNoteFailure(error);

    expect(reducer({}, action)).toEqual({ error });
  });

  it('has DELETE_NOTE_FAILURE action', () => {
    expect(actions.deleteNoteFailure(error)).toEqual({
      type: types.DELETE_NOTE_FAILURE,
      error
    });
  });

  it('reduces DELETE_NOTE_FAILURE action', () => {
    const action = actions.deleteNoteFailure(error);

    expect(reducer({}, action)).toEqual({ error });
  });
  it('has UPDATE_NOTE_FAILURE action', () => {
    expect(actions.updateNoteFailure(error)).toEqual({
      type: types.UPDATE_NOTE_FAILURE,
      error
    });
  });

  it('reduces UPDATE_NOTE_FAILURE action', () => {
    const action = actions.updateNoteFailure(error);

    expect(reducer({}, action)).toEqual({ error });
  });
});
