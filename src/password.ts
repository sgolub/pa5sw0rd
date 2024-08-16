import { LOWERCASE, DIGITS, SYMBOLS, UPPERCASE } from './constants';
import { Pa5sW0rdOptions } from './types';
import { normolaze, filter, randomize, shuffle } from './utils';

export default function password(opts: Pa5sW0rdOptions | number = {}): string {
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

  const randomUppercase = randomize(uppercase, uppercaseMin);
  const randomDigits = randomize(digits, digitsMin);
  const randomSymbols = randomize(symbols, symbolsMin);

  const theRsetLength =
    length -
    randomUppercase.length -
    randomDigits.length -
    randomSymbols.length;

  const randomUppercaseUpToMax =
    uppercaseMax === void 0
      ? []
      : randomize(uppercase, uppercaseMax - uppercaseMin);
  const randomDigitsUpToMax =
    digitsMax === void 0 ? [] : randomize(digits, digitsMax - digitsMin);
  const randomSymbolsUpToMax =
    symbolsMax === void 0 ? [] : randomize(symbols, symbolsMax - symbolsMin);

  const theRsetLengthWithMaxCounts =
    length -
    randomUppercaseUpToMax.length -
    randomDigitsUpToMax.length -
    randomSymbolsUpToMax.length;

  const randomTheRest =
    theRsetLengthWithMaxCounts > 0
      ? randomize(
          [
            ...lowercase,
            ...(uppercaseMax !== void 0 ? [] : uppercase),
            ...(digitsMax !== void 0 ? [] : digits),
            ...(symbolsMax !== void 0 ? [] : symbols),
          ],
          theRsetLengthWithMaxCounts,
        )
      : [];

  return shuffle([
    ...randomDigits,
    ...randomSymbols,
    ...randomUppercase,
    ...shuffle([
      ...randomTheRest,
      ...randomUppercaseUpToMax,
      ...randomDigitsUpToMax,
      ...randomSymbolsUpToMax,
    ]).slice(0, theRsetLength),
  ]).join('');
}
