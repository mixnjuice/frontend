import { reducer, types, actions } from './flavor';

describe('flavor reducer', () => {
  const stash = [
    {
      userId: '1',
      flavorId: '1',
      created: '2020-03-08T01:35:49.790Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '1',
        vendorId: 3,
        name: '27 Bears',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    },
    {
      userId: '1',
      flavorId: '2',
      created: '2020-03-08T01:47:10.174Z',
      minMillipercent: null,
      maxMillipercent: null,
      UserId: '1',
      Flavor: {
        id: '2',
        vendorId: 3,
        name: '27 Fish',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      }
    }
  ];
  const loaded = true;
  const error = { message: 'Failed' };
  const flavor = {
    userId: '1',
    flavorId: '3',
    created: '2020-03-08T01:48:02.231Z',
    minMillipercent: null,
    maxMillipercent: null,
    UserId: '1',
    Flavor: {
      id: '3',
      vendorId: 3,
      name: 'Acai',
      slug: null,
      density: null,
      Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
    }
  };

  it('has REQUEST_STASH action', () => {
    expect(actions.requestStash()).toEqual({
      type: types.REQUEST_STASH
    });
  });

  it('reduces REQUEST_STASH action', () => {
    const action = actions.requestStash();

    expect(reducer({}, action)).toEqual({});
  });

  it('has REQUEST_STASH_SUCCESS action', () => {
    expect(actions.requestStashSuccess(stash)).toEqual({
      type: types.REQUEST_STASH_SUCCESS,
      stash
    });
  });

  it('reduces REQUEST_STASH_SUCCESS action', () => {
    const action = actions.requestStashSuccess(stash);

    expect(reducer({}, action)).toEqual({ stash, loaded });
  });

  it('has ADD_TO_STASH action', () => {
    expect(actions.addStash(flavor)).toEqual({
      type: types.ADD_TO_STASH,
      flavor
    });
  });

  it('reduces ADD_TO_STASH action', () => {
    const action = actions.addStash(flavor);

    expect(reducer({}, action)).toEqual({});
  });

  it('has REMOVE_FROM_STASH action', () => {
    expect(actions.removeStash(flavor)).toEqual({
      type: types.REMOVE_FROM_STASH,
      flavor
    });
  });

  it('reduces REMOVE_FROM_STASH action', () => {
    const action = actions.removeStash(flavor);

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_STASH action', () => {
    expect(actions.updateStash(flavor)).toEqual({
      type: types.UPDATE_STASH,
      flavor
    });
  });

  it('reduces UPDATE_STASH action', () => {
    const action = actions.updateStash(flavor);

    expect(reducer({}, action)).toEqual({});
  });

  it('has UPDATE_STASH_SUCCESS action', () => {
    expect(actions.updateStashSuccess()).toEqual({
      type: types.UPDATE_STASH_SUCCESS
    });
  });

  it('reduces UPDATE_STASH_SUCCESS action', () => {
    const action = actions.updateStashSuccess();

    expect(reducer({}, action)).toEqual({ loaded: false });
  });

  it('has REQUEST_FAILURE action', () => {
    expect(actions.requestFailure(error)).toEqual({
      type: types.REQUEST_FAILURE,
      error
    });
  });

  it('reduces REQUEST_FAILURE action', () => {
    const action = actions.requestFailure(error);

    expect(reducer({}, action)).toEqual({ error });
  });
});
