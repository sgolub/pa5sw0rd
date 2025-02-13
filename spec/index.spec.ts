import Pa5sW0rd from '../src/index';

//! Password
it('generates default length password', () => {
  const { length } = Pa5sW0rd();
  expect(length).toBeGreaterThanOrEqual(12);
  expect(length).toBeLessThanOrEqual(24);
});

it('generates custom length password', () => {
  expect(Pa5sW0rd(8)).toHaveLength(8);
});

it('generates min length password', () => {
  expect(Pa5sW0rd(7)).toHaveLength(8);
});

it('generates max length password', () => {
  expect(Pa5sW0rd(129)).toHaveLength(128);
});

it('generates password with 5 digits', () => {
  const count = 5;
  expect(
    Pa5sW0rd({
      digits: count,
    }).match(/\d/g),
  ).toHaveLength(count);
});

it('generates password with at least 5 digits', () => {
  const count = 5;
  expect(
    Pa5sW0rd({
      digits: [count],
    }).match(/\d/g)?.length,
  ).toBeGreaterThanOrEqual(count);
});

it('generates password with 2-5 digits', () => {
  const countMin: number = 2;
  const countMax: number = 5;
  const { length } =
    Pa5sW0rd({
      digits: [countMin, countMax],
    }).match(/\d/g) ?? [];
  expect(length).toBeGreaterThanOrEqual(countMin);
  expect(length).toBeLessThanOrEqual(countMax);
});

it('generates password without digits', () => {
  const password = Pa5sW0rd({
    digits: 0,
  });
  expect(password.match(/\d/g)).toBeNull();
});

it('generates password with 5 uppercase', () => {
  const count = 5;
  expect(
    Pa5sW0rd({
      uppercase: count,
    }).match(/[A-Z]/g),
  ).toHaveLength(count);
});

it('generates complicated password', () => {
  const password = Pa5sW0rd({
    length: 15,
    uppercase: 2,
    digits: 2,
    symbols: 1,
  });

  expect(password).toHaveLength(15);

  const lowercaseCount = password.match(/[a-z]/g)?.length;
  const uppercaseCount = password.match(/[A-Z]/g)?.length;
  const digitsCount = password.match(/\d/g)?.length;

  expect(lowercaseCount).toEqual(10); //* =15-2-2-1
  expect(uppercaseCount).toEqual(2);
  expect(digitsCount).toEqual(2);
});

//! PIN
it('generates default length PIN', () => {
  expect(Pa5sW0rd.pin()).toHaveLength(4);
});

it('generates custom length PIN', () => {
  expect(Pa5sW0rd.pin(6)).toHaveLength(6);
});

it('generates min length PIN', () => {
  expect(Pa5sW0rd.pin(2)).toHaveLength(3);
});

it('generates max length PIN', () => {
  expect(Pa5sW0rd.pin(13)).toHaveLength(12);
});

//! Passphrase
it('generates default length passphrase', () => {
  const passphrase = Pa5sW0rd.passphrase({
    dictionary: ['word'],
    separators: '-',
  });
  expect(passphrase).toBe('word-word-word-word');
});

it('capitalizes each word in passphrase', () => {
  const passphrase = Pa5sW0rd.passphrase({
    dictionary: ['word'],
    separators: '-',
    capitalizeEachWord: true,
  });
  expect(passphrase).toBe('Word-Word-Word-Word');
});

it('capitalizes first word in passphrase', () => {
  const passphrase = Pa5sW0rd.passphrase({
    dictionary: ['word'],
    separators: '-',
    capitalize: true,
  });
  expect(passphrase).toBe('Word-word-word-word');
});

it('generates custom length passphrase', () => {
  const passphrase = Pa5sW0rd.passphrase({
    dictionary: ['word'],
    separators: '-',
    size: 5,
  });
  expect(passphrase).toBe('word-word-word-word-word');
});

it('capitalizes each word in passphrase', () => {
  const passphrase = Pa5sW0rd.passphrase({
    dictionary: ['word'],
    separators: '-',
    size: 5,
  });
  expect(passphrase).toBe('word-word-word-word-word');
});

it('capitalizes each word in passphrase', () => {
  const passphrase = Pa5sW0rd.passphrase({
    dictionary: ['word'],
    separators: '-',
    size: 5,
  });
  expect(passphrase).toBe('word-word-word-word-word');
});

it('generates default size passphrase', () => {
  const passphrase = Pa5sW0rd.passphrase({
    separators: '-',
  });
  expect(passphrase).toMatch(/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/);
});
