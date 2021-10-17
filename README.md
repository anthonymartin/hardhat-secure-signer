# hardhat-secure-signer

A plugin for using password encrypted private keys and mnemonics

## What

This plugin adds a layer of security to your hardhat installation. It will allow you to store your private keys and mnemonics in a password encrypted file. 
When running hardhat tasks that require a signer, a prompt will be displayed asking for the wallet to use and the password used to encrypt it.
This means that you don't need to store your private keys or mnemonics unencrypted on your hard drive.

## Installation

```bash
npm install hardhat-secure-signer @nomiclabs/hardhat-ethers ethers
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-secure-signer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-secure-signer";
```


## Required plugins

- [@nomiclabs/hardhat-ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)
- [ethers](https://www.npmjs.com/package/ethers)

## Tasks

This plugin adds the `init-signer` task to Hardhat:
```
Usage: hardhat [GLOBAL OPTIONS] init-signer

init-signer: generates encrypted signing key

```

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding an `useSigner` field
whose type is `useSigner`.


## Usage

To use this plugin, first you must run the `init-signer` hardhat task. 
Then, afterwards, from any hardhat task, you can access the signer using `hre.useSigner()`.
You will be prompted for a password to decrypt the signer.

## Todo

- add support for mnemonics
- auto add .signers to project .gitignore
- update to extend hardhat-ethers plugin instead