const isBrowser: boolean =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

const crypto: Crypto = isBrowser
  ? window.crypto
  : (require('node:crypto').webcrypto as Crypto);

export default crypto;
