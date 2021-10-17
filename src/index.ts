import { extendEnvironment, task } from "hardhat/config";
import { lazyFunction } from "hardhat/plugins";
import "@nomiclabs/hardhat-ethers";


// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";
import { useSigner } from './lib/useSigner';
import initializeSigner from "./tasks/initializeSigner";

task('init-signer', 'generates encrypted signing key').setAction(
  initializeSigner,
);

extendEnvironment((hre) => {
  // We add a field to the Hardhat Runtime Environment here.
  hre.useSigner = lazyFunction(() => useSigner);
});
