#! /usr/bin/env node
import { program } from 'commander';

import Pa5sW0rd from '../dist/index.js';

program
    .name('pa5sw0rd')
    .showHelpAfterError()
    .showSuggestionAfterError();

program
    .argument('[length]', 'password length')
    .action((length) => {
        printOut(Pa5sW0rd(Number(length)));
    });

program
    .command('password')
    .argument('[length]', 'password length')
    .option('-u, --uppercase <range>', 'uppercase number')
    .option('-d, --digits <range>', 'digits number')
    .option('-s, --symbols <range>', 'special symbols number')
    .option('-e, --exclude <excluded>', 'excluded symbols')
    .action((length, { uppercase, digits, symbols, exclude }) => {
        printOut(Pa5sW0rd.password({
            length: length ? Number(length) : void 0,
            uppercase: !uppercase ? void 0 : uppercase.split(' ').map(x => Number(x)).slice(0, 2),
            digits: !digits ? void 0 : digits.split(' ').map(x => Number(x)).slice(0, 2),
            symbols: !symbols ? void 0 : symbols.split(' ').map(x => Number(x)).slice(0, 2),
            exclude: exclude || void 0
        }));
    });

program
    .command('pin')
    .argument('[size]', 'pin size')
    .action((size) => {
        printOut(Pa5sW0rd.pin(size ? Number(size) : void 0));
    });

program
    .command('passphrase')
    .argument('[size]', 'passphrase size')
    .option('-s, --separators <separators>', 'separators list')
    .option('-c, --capitalize', 'capitalize the first word')
    .option('-e, --capitalizeEach', 'capitalize each word')
    .action((size, { separators, capitalize, capitalizeEach }) => {
        printOut(Pa5sW0rd.passphrase({
            dictionary: void 0,
            size: size ? Number(size) : void 0,
            separators: separators,
            capitalize: capitalize,
            capitalizeEachWord: capitalizeEach
        }));
    });

program.parse();

function printOut(result) {
    const output = result.split('')
        .map(c => {
            if (/[a-z]{1}/.test(c)) {
                return '\x1b[90m' + c + '\x1b[0m';
            } else if (/[A-Z]{1}/.test(c)) {
                return '\x1b[37m' + c + '\x1b[0m';
            } else if (/\d{1}/.test(c)) {
                return '\x1b[34m' + c + '\x1b[0m';
            } else {
                return '\x1b[31m' + c + '\x1b[0m';
            }
        })
        .join('');

    process.stdout.write(output + '\n');
}
