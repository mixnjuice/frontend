import { actions, types, reducer } from './toast';

describe('toast reducer', () => {
  const toast = {
    id: 'test123',
    title: 'Testing',
    icon: 'heart',
    message: 'This is a test.'
  };

  it('has POP_TOAST action', () => {
    const action = actions.popToast(toast);

    expect(action).toEqual({
      type: types.POP_TOAST,
      toast
    });
  });

  it('has ADD_TOAST action', () => {
    const action = actions.addToast(toast);

    expect(action).toEqual({
      type: types.ADD_TOAST,
      toast
    });
  });

  it('reduces ADD_TOAST action', () => {
    const action = actions.addToast(toast);

    expect(reducer({ queue: [] }, action)).toEqual({
      queue: [toast]
    });
  });

  it('has REMOVE_TOAST action', () => {
    const { id } = toast;
    const action = actions.removeToast(id);

    expect(action).toEqual({
      type: types.REMOVE_TOAST,
      id
    });
  });

  it('reduces REMOVE_TOAST action', () => {
    const action = actions.removeToast(toast.id);

    expect(reducer({ queue: [toast] }, action)).toEqual({
      queue: []
    });
  });

  it('has HIDE_TOAST action', () => {
    const { id } = toast;
    const action = actions.hideToast(id);

    expect(action).toEqual({
      type: types.HIDE_TOAST,
      id
    });
  });

  it('reduces HIDE_TOAST action', () => {
    const action = actions.hideToast(toast.id);

    expect(reducer({ queue: [toast] }, action)).toEqual({
      queue: [{ ...toast, show: false }]
    });

    expect(reducer({ queue: [] }, action)).toEqual({
      queue: []
    });
  });
});
