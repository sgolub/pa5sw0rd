import {
  PASSPHRASE_DEFAULT_SIZE,
  PASSPHRASE_MIN_SIZE,
  PASSPHRASE_MAX_SIZE,
  SYMBOLS,
  DIGITS,
} from '../common/constants';
import { PassphraseOptions } from '../common/options';
import { inRange, randomize, doCapitalize } from '../common/utils';
import { WORDS } from '../dictionary';

export default function passphrase(opts: PassphraseOptions | string[]): string {
  opts = Array.isArray(opts) ? { dictionary: opts } : opts;
  let {
    dictionary,
    size = PASSPHRASE_DEFAULT_SIZE,
    separators = '',
    capitalize = false,
    capitalizeEachWord = false,
  } = opts;

  dictionary = [...new Set(dictionary)];
  dictionary = dictionary.length ? dictionary : WORDS;

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
      capitalizeEachWord ? doCapitalize(String(words[size])) : words[size]
    }${size - 1 < 0 ? '' : delimiters[size - 1]}`;
  }

  if (capitalize && !capitalizeEachWord) {
    passphrase = doCapitalize(passphrase);
  }

  return passphrase;
}
