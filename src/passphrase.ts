import {
  PASSPHRASE_DEFAULT_SIZE,
  PASSPHRASE_MIN_SIZE,
  PASSPHRASE_MAX_SIZE,
  SYMBOLS,
  DIGITS,
} from './constants';
import { Pa5sW0rdPassphraseOptions } from './types';
import { inRange, randomize, doCapitalize } from './utils';

export default function passphrase(
  opts: Pa5sW0rdPassphraseOptions | string[],
): string {
  opts = Array.isArray(opts) ? { dictionary: opts } : opts;
  let {
    dictionary,
    size = PASSPHRASE_DEFAULT_SIZE,
    separators = '',
    capitalize = false,
    capitalizeEachWord = false,
  } = opts;
  size = inRange(size, PASSPHRASE_MIN_SIZE, PASSPHRASE_MAX_SIZE);
  separators =
    separators && typeof separators === 'string'
      ? separators.split('')
      : (separators as string[]) || [...DIGITS, ...SYMBOLS];

  const words = randomize(dictionary, size);
  const delimiters = randomize(separators, size - 1);

  let passphrase = '';

  while (size > 0) {
    size--;
    passphrase += `${
      capitalizeEachWord ? doCapitalize(words[size]) : words[size]
    }${size - 1 < 0 ? '' : delimiters[size - 1]}`;
  }

  if (capitalize && !capitalizeEachWord) {
    passphrase = doCapitalize(passphrase);
  }

  return passphrase;
}
