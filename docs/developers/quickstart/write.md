---
title: Writing blockchain data
description: Learn how to write blockchain data to the Ronin network.
---

## Introduction
This guide will walk you through writing data to the Ronin network using [ethers.js v6](https://docs.ethers.org/v6/). You’ll learn how to send transactions and interact with smart contracts.

## Prerequisites
Before you begin, make sure you have:
- **Node.js and a package manager** installed ([Download here](https://nodejs.org/))
- A **wallet private key** with sufficient RON for gas fees

## 1. Install ethers.js
If you haven’t already, install ethers.js using npm or yarn:
```sh
npm install ethers@6.x
```

## 2. Connect to the Ronin Network
To send transactions, you need both an RPC provider and a signer (wallet):
```javascript
import { ethers } from "ethers";

// Replace with a valid Ronin RPC URL
const RONIN_RPC_URL = "https://api.roninchain.com/rpc";
const provider = new ethers.JsonRpcProvider(RONIN_RPC_URL);

// Replace with your private key (DO NOT expose in production)
const privateKey = "0xYourPrivateKey";
const wallet = new ethers.Wallet(privateKey, provider);
```

:::info Public RPC endpoints
Check out our [Network information](/developers/network) to find a list of public RPC endpoints.
:::

## 3. Sending a Transaction
To send RON from one account to another:
```javascript
async function sendTransaction(to, amount) {
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.parseEther(amount), // Convert RON to Wei
  });

  console.log(`Transaction sent! Hash: ${tx.hash}`);
  await tx.wait();
  console.log("Transaction confirmed!");
}

const recipient = "0xRecipientAddressHere";
sendTransaction(recipient, "0.1"); // Send 0.1 RON
```

## 4. Writing Data to a Smart Contract
To interact with a smart contract, you need its **ABI** and address.
```javascript
const contractAddress = "0xYourContractAddress";
const decimals = 18; //the decimals of the token contract

const contractABI = [
  "function transfer(address to, uint256 amount) public returns (bool)"
];

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function transferTokens(to, amount) {
  const tx = await contract.transfer(to, amount);
  console.log(`Transaction sent! Hash: ${tx.hash}`);
  await tx.wait();
  console.log("Transaction confirmed!");
}

const tokenRecipient = "0xRecipientAddressHere";
transferTokens(tokenRecipient, ethers.parseUnits("100", decimals)); // Transfer 100 tokens
```

## Conclusion
You’ve successfully connected to the Ronin network, sent a transaction, and interacted with a smart contract.

