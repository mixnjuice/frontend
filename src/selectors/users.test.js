import { initialState } from 'reducers/users';
import {
  getCachedUsers,
  getUsersPager,
  getUsers,
  getAllUsers,
  getUser,
  getUserRoles
} from './users';

describe('users selectors', () => {
  const state = { users: initialState };

  it('can getUsers', () => {
    expect(getUsers(state)).toBe(state.users);
  });

  it('can getAllUsers', () => {
    expect(getAllUsers(state)).toBe(initialState.collection);
  });

  it('can getUser', () => {
    expect(getUser(state)).toBe(initialState.user);
  });

  it('can getUserRoles', () => {
    expect(getUserRoles(state)).toBe(initialState.roles);
  });

  it('can getCachedUsers', () => {
    expect(getCachedUsers(state)).toBe(initialState.cache);
  });

  it('can getUsersPager', () => {
    expect(getUsersPager(state)).toBe(initialState.pager);
  });
});
