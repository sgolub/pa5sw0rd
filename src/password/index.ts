import { LOWERCASE, DIGITS, SYMBOLS, UPPERCASE } from '../common/constants';
import { PasswordOptions } from '../common/options';
import { normolaze, filter, randomize, shuffle } from '../common/utils';

export default function password(opts: PasswordOptions | number = {}): string {
  if (typeof opts === 'number') {
    opts = { length: opts };
  }

  const {
    length,
    uppercase: [uppercaseMin, uppercaseMax],
    digits: [digitsMin, digitsMax],
    symbols: [symbolsMin, symbolsMax],
    exclude,
  } = normolaze(opts);
  const lowercase = filter(LOWERCASE, exclude);
  const uppercase = filter(UPPERCASE, exclude);
  const digits = filter(DIGITS, exclude);
  const symbols = filter(SYMBOLS, exclude);

  const randomUppercaseMin = randomize(uppercase, uppercaseMin);
  const randomDigitsMin = randomize(digits, digitsMin);
  const randomSymbolsMin = randomize(symbols, symbolsMin);

  const randomUppercaseUpToMax =
    uppercaseMax === void 0
      ? []
      : randomize(uppercase, uppercaseMax - uppercaseMin);
  const randomDigitsUpToMax =
    digitsMax === void 0 ? [] : randomize(digits, digitsMax - digitsMin);
  const randomSymbolsUpToMax =
    symbolsMax === void 0 ? [] : randomize(symbols, symbolsMax - symbolsMin);

  const theRestMin =
    length -
    (randomUppercaseMin.length + randomSymbolsUpToMax.length) -
    (randomDigitsMin.length + randomUppercaseUpToMax.length) -
    (randomSymbolsMin.length + randomDigitsUpToMax.length);
  const randomTheRestMin =
    theRestMin > 0
      ? randomize(
          [
            ...lowercase,
            ...(uppercaseMax !== void 0 ? [] : uppercase),
            ...(digitsMax !== void 0 ? [] : digits),
            ...(symbolsMax !== void 0 ? [] : symbols),
          ],
          theRestMin,
        )
      : [];

  const theRestMax =
    length -
    randomDigitsMin.length -
    randomSymbolsMin.length -
    randomUppercaseMin.length;
  const randomTheRestUpToMax =
    theRestMax > 0
      ? randomize(
          [
            ...lowercase,
            ...(uppercaseMax !== void 0 ? [] : uppercase),
            ...(digitsMax !== void 0 ? [] : digits),
            ...(symbolsMax !== void 0 ? [] : symbols),
          ],
          theRestMax,
        )
      : [];

  return shuffle([
    ...randomUppercaseMin,
    ...randomDigitsMin,
    ...randomSymbolsMin,
    ...randomTheRestMin,
    ...shuffle([
      ...randomUppercaseUpToMax,
      ...randomDigitsUpToMax,
      ...randomSymbolsUpToMax,
      ...randomTheRestUpToMax,
    ]).slice(
      0,
      length -
        randomUppercaseMin.length -
        randomDigitsMin.length -
        randomSymbolsMin.length -
        randomTheRestMin.length,
    ),
  ]).join('');
}
