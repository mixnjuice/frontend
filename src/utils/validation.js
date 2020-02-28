export const numeric = value => {
  return Number.isInteger(value) ? undefined : 'numeric';
};

export const matches = fieldName => (value, allValues) =>
  value === allValues[fieldName] ? undefined : 'matches';

export const required = value => (value ? undefined : 'required');

export const email = value =>
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
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

export const between = (minimum = -Infinity, maximum = Infinity) => value => {
  if (!value) {
    return 'between';
  }

  const intValue = parseInt(value, 10);

  if (intValue < minimum) {
    return 'min-between';
  } else if (intValue > maximum) {
    return 'max-between';
  } else {
    return undefined;
  }
};

export const composeValidators = (...validators) => (...args) =>
  validators.reduce(
    (error, validator) => error || validator(...args),
    undefined
  );
