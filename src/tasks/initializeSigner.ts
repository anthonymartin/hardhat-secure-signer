import { HardhatRuntimeEnvironment } from 'hardhat/types';
import path from 'path';
import fs from 'fs';
import { Wallet } from 'ethers';
import { encrypt } from '../lib/crypto';
import {
  askFor,
  askForEncryptionKey,
  askForOverwriteConfirmation,
} from '../lib/readline';

const SIGNERS_DIR = path.join(process.env.INIT_CWD || './', '.signers');

async function main(args: any, hre: HardhatRuntimeEnvironment) {
  const encryptionKey = askForEncryptionKey();
  const privateKey = askFor('wallet private key', undefined, true);

  createDirectoryIfNotExists();
  if (keyFileExists(privateKey) && askForOverwriteConfirmation()) {
    writeKeyToFile(privateKey, encryptionKey);
  } else if (!keyFileExists(privateKey)) {
    writeKeyToFile(privateKey, encryptionKey);
  }
}

function createDirectoryIfNotExists() {
  if (!fs.existsSync(SIGNERS_DIR)) {
    fs.mkdirSync(SIGNERS_DIR, 700);
  }
}

function writeKeyToFile(privateKey: string, encryptionKey: string) {
  const wallet = new Wallet(privateKey);
  const file = path.join(SIGNERS_DIR, `${wallet.address}.enc`);

  fs.writeFileSync(file, encrypt(privateKey, encryptionKey), { mode: '600' });
}

function keyFileExists(privateKey: string) {
  const wallet = new Wallet(privateKey);
  const file = path.join(SIGNERS_DIR, `${wallet.address}.enc`);
  if (fs.existsSync(file)) {
    return true;
  }
  return false;
}

export default main;
