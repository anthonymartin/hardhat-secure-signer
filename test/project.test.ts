// tslint:disable-next-line no-implicit-dependencies
import { assert } from 'chai'

import { useEnvironment } from './helpers'

describe('Integration tests examples', function () {
  describe('Hardhat Runtime Environment extension', function () {
    useEnvironment('hardhat-project')

    it('Should add the askForSigner function', function () {
      assert.instanceOf(this.hre.askForSigner, Function)
    })
  })
});
