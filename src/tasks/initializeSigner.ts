import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import initializeSigner from '../lib/initializeSigner';

async function main(args: any, hre: HardhatRuntimeEnvironment) {
  return initializeSigner();
} 

export default task(
  'init-signer',
  'generates encrypted signing key',
).setAction(main);
