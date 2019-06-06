import { buildActions } from 'utils';

export const types = buildActions('application', [
  'INIT_APP',
  'LOGIN_USER',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_FAILURE',
  'LOGOUT_USER',
  'LOGOUT_USER_SUCCESS',
  'LOGOUT_USER_FAILURE',
  'REGISTER_USER',
  'REGISTER_USER_SUCCESS',
  'REGISTER_USER_FAILURE'
]);

const initApp = () => ({
  type: types.INIT_APP
});

const loginUser = (emailAddress, password) => ({
  type: types.LOGIN_USER,
  emailAddress,
  password
});

const loginUserSuccess = user => ({
  type: types.LOGIN_USER_SUCCESS,
  user
});

const loginUserFailure = error => ({
  type: types.LOGIN_USER_FAILURE,
  error
});

const logoutUser = () => ({
  type: types.LOGOUT_USER
});

const logoutUserSuccess = () => ({
  type: types.LOGOUT_USER_SUCCESS
});

const logoutUserFailure = error => ({
  type: types.LOGOUT_USER_FAILURE,
  error
});

const registerUser = details => ({
  type: types.REGISTER_USER,
  details
});

const registerUserSuccess = () => ({
  type: types.REGISTER_USER_SUCCESS
});

const registerUserFailure = error => ({
  type: types.REGISTER_USER_FAILURE,
  error
});

export const actions = {
  initApp,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure,
  registerUser,
  registerUserSuccess,
  registerUserFailure
};

export const initialState = {
  loggingIn: false,
  user: null,
  error: null,
  registration: {
    complete: false,
    error: null
  }
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        loggingIn: true
      };
    case types.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: null
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.user
      };
    case types.LOGIN_USER_FAILURE:
    case types.LOGOUT_USER_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.error
      };
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        registration: {
          complete: true,
          error: null
        }
      };
    case types.REGISTER_USER_FAILURE:
      return {
        ...state,
        registration: {
          complete: true,
          error: action.error
        }
      };
    default:
      return state;
  }
};
