const isBrowser: boolean =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

var customCrypto: Crypto;

function crypto(): Crypto;
function crypto(crypto: Crypto): void;
function crypto(crypto?: Crypto): Crypto | void {
  if (!isBrowser && crypto) {
    customCrypto = crypto;
    return;
  }

  if (isBrowser && crypto) {
    console.warn(
      'Custom crypto object is not supported in browser environment',
    );
  }

  if (isBrowser) {
    return window.crypto;
  }

  if (customCrypto) {
    return customCrypto;
  }

  throw new Error('Crypto object is not available');
}

export default crypto;
