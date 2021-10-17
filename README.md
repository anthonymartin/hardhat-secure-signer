# hardhat-secure-signer

A plugin for enhanced hardhat credential security 🔐

## About

This plugin adds a layer of security to your hardhat installation. When running a task, it will prompt you to enter one-time signer credentials or store your credentials in a password encrypted file. 
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

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding an `askForSigner` function.


## Usage

To use this plugin from your hardhat tasks, use `hre.askForSigner()`.
You will be prompted for credentials to enter or save.

e.g.

```typescript
  const signer = hre.askForSigner();
  console.log('Signer is', signer.address);
```

## Tasks

This plugin adds an `init-signer` task to Hardhat:

```
Usage: hardhat [GLOBAL OPTIONS] init-signer

init-signer: generates encrypted signing key

```

## Todo

- add support for mnemonics
- update plugin to extend hardhat-ethers plugin instead
- make more secure (e.g. remote secret manager integration)