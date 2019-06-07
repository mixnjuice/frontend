export const required = value => (value ? undefined : 'required');

export const email = value =>
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  )
    ? undefined
    : 'email';

export const length = (minimum = 0, maximum = Infinity) => value => {
  if (!value || !value.length) {
    return 'min-length';
  }

  if (value.length >= minimum && value.length <= maximum) {
    return undefined;
  } else if (value.length >= minimum) {
    return 'max-length';
  } else {
    return 'min-length';
  }
};
