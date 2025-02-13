import password from './password';
import pin from './pin';
import passphrase from './passphrase';
import { PasswordOptions } from './common/options';
import { WORDS } from './dictionary';

passphrase.setDictionary(WORDS);

Pa5sW0rd.password = password;
Pa5sW0rd.pin = pin;
Pa5sW0rd.passphrase = passphrase;

/**
 * Generates a password.
 *
 * @param {PasswordOptions | number} opts The options to use.
 * @returns {string} The generated password.
 */
export default function Pa5sW0rd(opts: PasswordOptions | number = {}): string {
  return password(opts);
}
