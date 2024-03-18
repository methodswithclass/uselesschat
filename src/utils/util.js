import { isNil, isEmpty } from 'ramda';

export const isNilOrEmpty = (input) => {
  const value = typeof input === 'string' ? input.trim() : input;
  return isNil(value) || isEmpty(value);
};
