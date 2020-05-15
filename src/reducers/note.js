import { buildActions } from 'utils';

export const types = buildActions('note', [
  'REQUEST_LOADING',
  'REQUEST_NOTE',
  'REQUEST_NOTE_SUCCESS',
  'REQUEST_FAILURE',
  'CREATE_NOTE',
  'CREATE_NOTE_SUCCESS',
  'DELETE_NOTE',
  'DELETE_NOTE_SUCCESS',
  'UPDATE_NOTE',
  'UPDATE_NOTE_SUCCESS'
]);

const requestLoading = flavorId => ({
  type: types.REQUEST_LOADING,
  flavorId
});

const requestNote = note => ({
  type: types.REQUEST_NOTE,
  note
});

const requestNoteSuccess = note => ({
  type: types.REQUEST_NOTE_SUCCESS,
  note
});

const requestFailure = error => ({
  type: types.REQUEST_FAILURE,
  error
});

const createNote = flavorNote => ({
  type: types.CREATE_NOTE,
  flavorNote
});

const createNoteSuccess = note => ({
  type: types.CREATE_NOTE_SUCCESS,
  note
});

const deleteNote = flavorNote => ({
  type: types.DELETE_NOTE,
  flavorNote
});

const deleteNoteSuccess = flavorId => ({
  type: types.DELETE_NOTE_SUCCESS,
  flavorId
});

const updateNote = flavorNote => ({
  type: types.UPDATE_NOTE,
  flavorNote
});

const updateNoteSuccess = flavorId => ({
  type: types.UPDATE_NOTE_SUCCESS,
  flavorId
});

export const actions = {
  requestLoading,
  requestNote,
  requestNoteSuccess,
  requestFailure,
  createNote,
  createNoteSuccess,
  deleteNote,
  deleteNoteSuccess,
  updateNote,
  updateNoteSuccess
};

export const initialState = {
  loading: false,
  error: null,
  collection: {}
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_LOADING:
      return {
        ...state,
        loading: action.flavorId
      };
    case types.REQUEST_NOTE_SUCCESS:
      return {
        ...state,
        collection: action.note,
        loading: false
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.CREATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        collection: {
          ...state.collection,
          [action.flavorId]: null
        },
        loading: false
      };
    case types.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        collection: {
          ...state.collection,
          [action.flavorId]: null
        },
        loading: false
      };
    default:
      return state;
  }
};
