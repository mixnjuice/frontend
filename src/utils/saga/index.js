/* import { counter } from './counter';
import { pager } from './pager';
import { errorToast, successToast, toast } from './toasts';

export const helpers = {
  counter,
  pager,
  errorToast,
  successToast,
  toast
};*/
import counterUtilities from './counter';
import pageUtilities from './pager';
import toastUtilities from './toasts';

export default {
  ...counterUtilities,
  ...pageUtilities,
  ...toastUtilities
};
