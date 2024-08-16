import {
  DIGITS,
  SYMBOLS,
  UPPERCASE,
  PASSWORD_DEFAULT_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './constants';
import crypto from './crypto';
import {
  NormolizedPa5sW0rdOptions,
  Pa5sW0rdOptions,
  Pa5sW0rdRange,
} from './types';

export function normolaze(opts: Pa5sW0rdOptions): NormolizedPa5sW0rdOptions {
  let { length, digits, symbols, uppercase, exclude } = opts;

  exclude = exclude || '';

  digits = toRange(digits);
  if (digits[0] === 0) {
    exclude += DIGITS;
  }

  symbols = toRange(symbols);
  if (symbols[0] === 0) {
    exclude += SYMBOLS;
  }

  uppercase = toRange(uppercase);
  if (uppercase[0] === 0) {
    exclude += UPPERCASE;
  }

  if (!length) {
    length = PASSWORD_DEFAULT_LENGTH;
  }
  length = inRange(length, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);

  if (digits[0] + symbols[0] + uppercase[0] > length) {
    throw new Error('Parameters are incorrect.');
  }

  return {
    length,
    digits,
    symbols,
    uppercase,
    exclude,
  };
}

export function randomize<T>(elements: T[], count: number): T[] {
  let result: T[] = [];
  const { length } = elements;
  if (length === 0 || count === 0) {
    return result;
  }

  const randomValues = getRandomValues(count);

  for (let i = 0; i < count; i++) {
    result.push(elements[randomValues[i] % length]);
  }
  return result;
}

// #ref: https://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling#answer-962890
export function shuffle<T>(array: T[]): T[] {
  let tmp,
    current,
    top = array.length;
  const { length } = array;
  if (!top) {
    return array;
  }

  const randomValues = getRandomValues(length);
  while (--top) {
    current = randomValues[top] % length;
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }

  return array;
}

export function getRandomValues(count: number) {
  return crypto.getRandomValues(new Uint32Array(count));
}

export function doCapitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function inRange(value: number, min: number, max: number) {
  return Math.min(Math.max(min, value), max);
}

export function toRange(value?: number | Pa5sW0rdRange): Pa5sW0rdRange {
  // atleast one
  if (value === void 0) {
    return [1];
  }

  // exact number
  if (typeof value === 'number') {
    const min = Math.max(0, value);
    return [min, min];
  }

  // min & max?
  let [min, max] = value;
  min = Math.max(0, min);
  if (!max) {
    return [min];
  }

  max = Math.max(min, max);
  return [min, max];
}

export function filter(alphabet: string[], exclude: string): string[] {
  if (!exclude) {
    return alphabet;
  }

  return alphabet
    .join('')
    .replace(new RegExp(`[${exclude}]`, 'g'), '')
    .split('');
}
