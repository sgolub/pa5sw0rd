# Pa5sW0rd.

Password generator with a focus on security and usability.

## Install

```bash
npm install pa5sw0rd
yarn add pa5sw0rd
pnpm add pa5sw0rd
```

## Usage

Importing for a browser or Node.js

```js
// es modules
import Pa5sW0rd from 'pa5sw0rd';
import password from 'pa5sw0rd/password';
import pin from 'pa5sw0rd/pin';
import passphrase from 'pa5sw0rd/passphrase';

// common.js
const Pa5sW0rd = require('pa5sw0rd');
const password = require('pa5sw0rd/password');
const pin = require('pa5sw0rd/pin');
const passphrase = require('pa5sw0rd/passphrase');
```

### Password

```js
Pa5sW0rd.password(12); // 12 length password

Pa5sW0rd.password({
  length: 16,
  uppercase: 1, // exactly one
  digits: [4], // at least 4
  symbols: [0, 5], // up to 5
  exclude: 'lI|', // excluded characters
});
```

### PIN

```js
Pa5sW0rd.pin(6); // 6-digit pin code
```

### Passphrase

```js
Pa5sW0rd.passphrase(6); // 6-word passphrase

Pa5sW0rd.passphrase({
  size: 5, // 5-word passphrase
  capitalize: true, // capitalize first letter
});

Pa5sW0rd.passphrase({
  capitalizeEachWord: true, // capitalize each word
});

Pa5sW0rd.passphrase({
  size: 3, // 3-word passphrase
  separators: '-', // words separator
});
```

## CLI

```bash
npm install --global pa5sw0rd

npx pa5sw0rd
npx pa5

# 8 length password
pa5sw0rd 8

# 12 length password with at least 2 uppercase, 3 digits, 1 special symbol, and excluding the characters 'lI|'
pa5sw0rd password 12 --uppercase 2 --digits 3 --symbols 1 --exclude 'lI|'

# 6-digit pin code
pa5sw0rd pin 6

# 3 words separated with '-' and first capitalized character
pa5sw0rd passphrase 3 --separators '-' --capitalize
```
