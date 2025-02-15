import Pa5sW0rd from './pa5sw0rd';
import { webcrypto } from 'node:crypto';
import { WORDS } from './dictionary';
import crypto from './common/crypto';

crypto(webcrypto as Crypto);
Pa5sW0rd.passphrase.setDictionary(WORDS);

export default Pa5sW0rd;
