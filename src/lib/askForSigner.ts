import fs from 'fs'
import path from 'path'
import { decrypt } from './crypto'
import { askForWalletToUse, askForPassword, askFor } from './readline'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { Wallet } from 'ethers'
import os from "os";
import initializeSigner from './initializeSigner'

const SIGNERS_DIR = path.join(os.homedir(), '.eth');


export function askForSigner(
  hre: HardhatRuntimeEnvironment,
): Wallet | undefined {

  let privateKey = '';

  const options = fs.readdirSync(SIGNERS_DIR).map((file) => {
    return file.split('.')[0]
  });
  options.push("Use one-time private key (do not save private key to hard drive)");
  options.push("Enter and save private key (saves password-encrypted private key to hard drive)");

  const selectedOption = askForWalletToUse(options)

  if (selectedOption === "create-and-save-key") {
     privateKey = initializeSigner();
     return new Wallet(privateKey, hre.ethers.provider);
  }

  if (selectedOption === 'one-time-key') {
    privateKey = askFor('wallet private key', undefined, true);
    return new Wallet(privateKey, hre.ethers.provider);
  }
  
  const encryptedKey = fs
    .readFileSync(path.join(SIGNERS_DIR, `${selectedOption}.enc`))
    .toString();
  const password = askForPassword();
  privateKey = decrypt(encryptedKey, password);

  return new Wallet(privateKey, hre.ethers.provider);
}
