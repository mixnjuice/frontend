import { buildActions } from 'utils';

export const types = buildActions('notes', [
  'REQUEST_NOTES',
  'REQUEST_NOTES_SUCCESS',
  'REQUEST_NOTES_FAILURE'
]);

const requestNotes = notes => ({
  type: types.REQUEST_NOTES,
  notes
});

const requestNotesSuccess = notes => ({
  type: types.REQUEST_NOTES_SUCCESS,
  notes
});

const requestNotesFailure = error => ({
  type: types.REQUEST_NOTES_FAILURE,
  error
});

export const actions = {
  requestNotes,
  requestNotesSuccess,
  requestNotesFailure
};

export const initialState = {
  loaded: false,
  cache: [],
  collection: [],
  error: null
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_NOTES_SUCCESS:
      return {
        ...state,
        collection: action.notes
      };
    case types.REQUEST_NOTES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
