import { all, put, call, select } from 'redux-saga/effects';
import helper from 'utils/saga';
import request from 'utils/request';
import { actions } from 'reducers/note';
import saga, { watchers, workers } from './note';
import { getFlavorNote } from 'selectors/note';
import { getCurrentUser } from 'sagas/profile';

describe('note sagas', () => {
  const flavorNote = {
    '3': null,
    '5': false,
    '8': {
      userId: 1,
      flavorId: 1,
      created: '2020-03-17T00:51:07.118Z',
      note: 'Shnacks !?\n\n### It probably sucks',
      Flavor: {
        id: 1,
        vendorId: 1,
        name: 'Apple Snacks',
        slug: null,
        density: null,
        Vendor: { id: 3, name: 'Capella', slug: 'capella', code: 'CAP' }
      },
      UserProfile: {
        userId: 1,
        name: 'david',
        location: 'Albuquerque, NM',
        bio: 'Al Vapone',
        url: 'daviddyess.com'
      }
    }
  };

  const note = {
    userId: 1,
    flavorId: 1,
    note: 'Shnacks !?\n\n### It probably sucks'
  };

  const flavorId = 1;

  const user = { id: 1 };

  it('handles cached data in requestNoteWorker', () => {
    const collection = { [flavorId]: true };

    const gen = workers.requestNoteWorker({ note });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestLoading(flavorId)));

    result = gen.next(collection);

    expect(result.value).toEqual(select(getFlavorNote));

    result = gen.next(collection);

    expect(result.value).toEqual(put(actions.requestNoteSuccess(collection)));
  });

  it('handles success in requestNoteWorker', () => {
    const collection = [flavorNote];
    const endpoint = {
      url: `/user/1/note/1`,
      method: 'GET'
    };

    const gen = workers.requestNoteWorker({ note });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestLoading(flavorId)));

    result = gen.next();

    expect(result.value).toEqual(select(getFlavorNote));

    result = gen.next(collection);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint
      })
    );

    result = gen.next({
      success: true,
      response: {
        data: flavorNote
      }
    });

    expect(result.value).toEqual(put(actions.requestNoteSuccess(collection)));
  });

  it('handles success with empty result in requestNoteWorker', () => {
    const collection = { [flavorId]: false };
    const endpoint = {
      url: `/user/1/note/1`,
      method: 'GET'
    };

    const gen = workers.requestNoteWorker({ note });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestLoading(flavorId)));

    result = gen.next();

    expect(result.value).toEqual(select(getFlavorNote));

    result = gen.next(collection);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint
      })
    );

    result = gen.next({
      success: true,
      response: {
        data: false
      }
    });

    expect(result.value).toEqual(put(actions.requestNoteSuccess(collection)));
  });

  it('handles failure in requestNoteWorker', () => {
    const error = new Error('Must be logged in to utilize Flavor Stash');
    const gen = workers.requestNoteWorker({
      note: { flavorId: 1, userId: null }
    });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestLoading(flavorId)));

    result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next();

    expect(result.value).toEqual(put(actions.requestFailure(error)));
  });

  it('handles success in createNoteWorker', () => {
    const endpoint = {
      url: `/user/${user.id}/note`,
      method: 'POST'
    };

    const data = note;

    const message = {
      title: 'Note',
      message: `Flavor ID 1 Note successfully created!`
    };

    const gen = workers.createNoteWorker({ flavorNote: { ...note } });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestLoading(flavorId)));

    result = gen.next(flavorId);

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint,
        data
      })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(put(actions.createNoteSuccess()));

    result = gen.next();

    expect(result.value).toEqual(call(helper.toast, message));
  });

  it('handles failure in createNoteWorker', () => {
    const error = new TypeError("Cannot read property 'flavorId' of undefined");
    const gen = workers.createNoteWorker(note);

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.errorToast, "Cannot read property 'flavorId' of undefined")
    );
  });

  it('handles success in deleteNoteWorker', () => {
    const endpoint = {
      url: `/user/${user.id}/note/${flavorId}`,
      method: 'DELETE'
    };

    const message = {
      title: 'Note',
      message: `Flavor ID ${flavorId} note successfully deleted!`
    };

    const gen = workers.deleteNoteWorker({ flavorNote: { ...note } });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestLoading(flavorId)));

    result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint
      })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(put(actions.deleteNoteSuccess(flavorId)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.toast, message));
  });

  it('handles failure in deleteNoteWorker', () => {
    const error = new TypeError("Cannot read property 'flavorId' of undefined");
    const gen = workers.deleteNoteWorker(flavorId);

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.errorToast, "Cannot read property 'flavorId' of undefined")
    );
  });

  it('handles success in updateNoteWorker', () => {
    const endpoint = {
      url: `/user/${user.id}/note/${flavorId}`,
      method: 'PUT'
    };

    const message = {
      title: 'Note',
      message: `Flavor ID ${flavorId} Note successfully updated!`
    };

    const gen = workers.updateNoteWorker({ flavorNote: { ...note } });

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestLoading(flavorId)));

    result = gen.next();

    expect(result.value).toEqual(call(getCurrentUser));

    result = gen.next(user);

    expect(result.value).toEqual(
      call(request.execute, {
        endpoint,
        data: note
      })
    );

    result = gen.next({
      success: true
    });

    expect(result.value).toEqual(put(actions.updateNoteSuccess(flavorId)));

    result = gen.next();

    expect(result.value).toEqual(call(helper.toast, message));
  });

  it('handles failure in updateNoteWorker', () => {
    const error = new TypeError("Cannot read property 'flavorId' of undefined");
    const gen = workers.updateNoteWorker(note);

    let result = gen.next();

    expect(result.value).toEqual(put(actions.requestFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      call(helper.errorToast, "Cannot read property 'flavorId' of undefined")
    );
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
