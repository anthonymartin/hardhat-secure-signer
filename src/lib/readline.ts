import crypto from 'crypto';
import { question, keyInSelect } from 'readline-sync';

export function askForOverwriteConfirmation() {
  const overwrite = askFor('Do you want to overwrite the existing key?', 'No');
  return ['Yes', 'Y', 'YES', 'y'].includes(overwrite);
}

export function askForWalletToUse(addresses: string[]) {
  const key = keyInSelect(
    addresses,
    'Which wallet would you like to use for signing transactions?',
  );
  if (key === -1) {
    process.exit();
  }
  return addresses[key];
}

export function askForEncryptionKey(): string {
  const encryptionKey = askFor(
    'password to encrypt signing key',
    undefined,
    true,
  );
  const encryptionKeyConfirmation = askFor(
    'password confirmation',
    undefined,
    true,
  );
  if (encryptionKey !== encryptionKeyConfirmation) {
    console.log('Encryption key does not match. Please try again.');
    return askForEncryptionKey();
  }
  return crypto.createHash('md5').update(encryptionKey).digest('hex');
}

export function askForPassword() {
  const password = askFor('password to decrypt signing key', undefined, true);
  return crypto.createHash('md5').update(password).digest('hex');
}

export function askFor(
  query: string,
  defaultInput?: string,
  hideInput = false,
): string {
  const questionDefault =
    defaultInput === undefined ? '' : ' (default: ' + defaultInput + ')';
  const options = {
    hideEchoBack: hideInput,
    limit: /./,
    limitMessage: '',
    defaultInput,
  };
  return question('Enter ' + query + questionDefault + ':\n', options);
}

export function printInvalidInput(inputType: string): void {
  console.log('This is not a valid', inputType);
}
