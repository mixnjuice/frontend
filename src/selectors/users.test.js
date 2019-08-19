import { initialState } from 'reducers/users';
import { getUsers, getAllUsers, getUser, getUserRoles } from './users';

describe('users selectors', () => {
  const state = { users: initialState };

  it('can getUsers', () => {
    expect(getUsers(state)).toBe(state.users);
  });

  it('can getAllUsers', () => {
    expect(getAllUsers(state)).toBe(initialState.users);
  });

  it('can getUser', () => {
    expect(getUser(state)).toBe(initialState.user);
  });

  it('can getUserRoles', () => {
    expect(getUserRoles(state)).toBe(initialState.roles);
  });
});
