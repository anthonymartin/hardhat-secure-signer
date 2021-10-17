import fs from 'fs'
import path from 'path'
import { decrypt } from './crypto'
import { askForWalletToUse, askForPassword } from './readline'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { Wallet } from 'ethers'

const SIGNERS_DIR = path.join(process.env.INIT_CWD || './', '.signers')


export function useSigner(
  provider: HardhatRuntimeEnvironment['ethers']['provider'],
): Wallet | undefined {
  const addresses = fs.readdirSync(SIGNERS_DIR).map((file) => {
    return file.split('.')[0]
  })

  if (!addresses.length) {
    console.log(
      'There are no signing keys found. You must run `hardhat init-signer` first.',
    )
    return
  }

  const chosenKey = askForWalletToUse(addresses)
  const encryptedKey = fs
    .readFileSync(path.join(SIGNERS_DIR, `${chosenKey}.enc`))
    .toString()
  const password = askForPassword()
  const privateKey = decrypt(encryptedKey, password)

  return new Wallet(privateKey, provider)
}
