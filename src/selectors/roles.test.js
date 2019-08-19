import { initialState } from 'reducers/roles';
import { getRoles, getAllRoles, getRoleUsers } from './roles';

describe('roles selectors', () => {
  const state = { roles: initialState };

  it('can getRoles', () => {
    expect(getRoles(state)).toBe(state.roles);
  });

  it('can getAllRoles', () => {
    expect(getAllRoles(state)).toBe(initialState.roles);
  });

  it('can getRoleUsers', () => {
    expect(getRoleUsers(state)).toBe(initialState.roleUsers);
  });
});
