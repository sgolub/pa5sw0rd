import password from './password';
import pin from './pin';
import passphrase from './passphrase';
import { Pa5sW0rdOptions } from './types';

Pa5sW0rd.password = password;
Pa5sW0rd.pin = pin;
Pa5sW0rd.passphrase = passphrase;

export default function Pa5sW0rd(opts: Pa5sW0rdOptions | number = {}): string {
  return password(opts);
}
