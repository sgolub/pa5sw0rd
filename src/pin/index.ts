import {
  PIN_DEFAULT_LENGTH,
  DIGITS,
  PIN_MIN_LENGTH,
  PIN_MAX_LENGTH,
} from '../common/constants';
import { randomize, inRange } from '../common/utils';

/**
 * Generates a PIN.
 *
 * @param {number} size The size of the PIN.
 * @returns {string} The generated PIN.
 */
export default function pin(size: number = PIN_DEFAULT_LENGTH): string {
  return randomize(DIGITS, inRange(size, PIN_MIN_LENGTH, PIN_MAX_LENGTH)).join(
    '',
  );
}
