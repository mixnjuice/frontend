import { put } from 'redux-saga/effects';
import { actions as toastActions } from 'reducers/toast';
import { toast, errorToast, successToast } from './toasts';

const msg = {
  icon: 'times-circle2',
  title: 'Space Splitter',
  message: 'Successfully split time and space, thanks?!'
};

const message = 'YES! Way to go!';

it('handles success in toast', () => {
  const gen = toast(msg);

  const result = gen.next(msg);

  expect(result.value).toEqual(
    put(
      toastActions.popToast({
        title: 'Space Splitter',
        icon: 'times-circle2',
        message: 'Successfully split time and space, thanks?!'
      })
    )
  );
});

it('handles success in errorToast', () => {
  const gen = errorToast(message);

  const result = gen.next(message);

  expect(result.value).toEqual(
    put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message: 'YES! Way to go!'
      })
    )
  );
});

it('handles success in successToast', () => {
  const gen = successToast(message);

  const result = gen.next(message);

  expect(result.value).toEqual(
    put(
      toastActions.popToast({
        title: 'Success',
        icon: 'times-circle',
        message: 'YES! Way to go!'
      })
    )
  );
});
