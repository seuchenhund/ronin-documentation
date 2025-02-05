---
title: Reading blockchain data
description: Learn how to read blockchain data from the Ronin network.
---

## Introduction
This guide will walk you through reading blockchain data from the Ronin network using [ethers.js v6](https://docs.ethers.org/v6/). You’ll learn how to connect to Ronin, retrieve account balances, and read smart contract data.

## Prerequisites
Before you begin, make sure you have:
- **Node.js and a package manager** installed ([Download here](https://nodejs.org/))

## 1. Install ethers.js
If you haven’t already, install ethers.js using the package manager of your choice:
```sh
npm install ethers@6.x
```

## 2. Connect to the Ronin Network
To interact with Ronin, you need an RPC provider:
```javascript
import { ethers } from "ethers";

// Replace with a valid Ronin RPC URL
const RONIN_RPC_URL = "https://api.roninchain.com/rpc";
const provider = new ethers.JsonRpcProvider(RONIN_RPC_URL);
```

:::info Public RPC endpoints
Check out our [Network information](/developers/network) to find a list of public RPC endpoints.
:::

## 3. Fetch Account Balance
You can check the RON balance of an address:
```javascript
async function getBalance(address) {
  const balance = await provider.getBalance(address);
  console.log(`Balance: ${ethers.formatEther(balance)} RON`);
}

 //We're reading the RON balance of the Ronin Treasury. Replace the below address with any address you want to check.
const walletAddress = "0x22cefc91e9b7c0f3890ebf9527ea89053490694e";
getBalance(walletAddress);
```

## 4. Read Smart Contract Data
If you want to interact with a smart contract, you need its **ABI** and address.
```javascript
//In this example, we want to check the WRON balance.
const contractAddress = "0xe514d9deb7966c8be0ca922de8a064264ea6bcd4";
const decimals = 18; //the decimals of the token contract

const contractABI = [
  "function balanceOf(address owner) view returns (uint256)"
];
//Replace the above contractAddress and contractABI with any contract/abi you want to check.

const contract = new ethers.Contract(contractAddress, contractABI, provider);

async function getTokenBalance(ownerAddress) {
  const balance = await contract.balanceOf(ownerAddress);
  console.log(`Token Balance: ${ethers.formatUnits(balance.toString(),decimals)}`);
}

//Again, we're reading the WRON balance of the Ronin Treasury. Replace the below address with any address you want to check.
const tokenHolder = "0x22cefc91e9b7c0f3890ebf9527ea89053490694e";
getTokenBalance(tokenHolder);
```

## Conclusion
You’ve successfully connected to the Ronin network, fetched an account’s balance, and read smart contract data.

