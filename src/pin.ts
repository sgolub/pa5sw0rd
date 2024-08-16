import {
  PIN_DEFAULT_LENGTH,
  DIGITS,
  PIN_MIN_LENGTH,
  PIN_MAX_LENGTH,
} from './constants';
import { randomize, inRange } from './utils';

export default function pin(size: number = PIN_DEFAULT_LENGTH): string {
  return randomize(DIGITS, inRange(size, PIN_MIN_LENGTH, PIN_MAX_LENGTH)).join(
    '',
  );
}
