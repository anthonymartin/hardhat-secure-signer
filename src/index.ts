import { extendEnvironment, task } from "hardhat/config";
import { lazyFunction } from "hardhat/plugins";
import "@nomiclabs/hardhat-ethers";
import "./type-extensions";
import { askForSigner } from './lib/askForSigner';

import "./tasks/initializeSigner";

extendEnvironment((hre) => {
  // We add a field to the Hardhat Runtime Environment here.
  hre.askForSigner = lazyFunction(() => () => askForSigner(hre));
});
