import { initialState } from 'reducers/roles';
import {
  getCachedRoles,
  getRolesPager,
  getRoles,
  getAllRoles,
  getRoleUsers
} from './roles';

describe('roles selectors', () => {
  const state = { roles: initialState };

  it('can getRoles', () => {
    expect(getRoles(state)).toBe(state.roles);
  });

  it('can getAllRoles', () => {
    expect(getAllRoles(state)).toBe(initialState.collection.roles);
  });

  it('can getRoleUsers', () => {
    expect(getRoleUsers(state)).toBe(initialState.roleUsers);
  });

  it('can getCachedRoles', () => {
    expect(getCachedRoles(state)).toBe(initialState.collection.cache);
  });

  it('can getFlavorsPager', () => {
    expect(getRolesPager(state)).toBe(initialState.collection.pager);
  });
});
