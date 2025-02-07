---
title: Chainlink Price Feeds
description: Learn how to use Chainlink Price Feeds data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Chainlink](https://chain.link/) Price Feeds are on-chain reference contracts that are automatically updated by decentralized oracle networks (DONs) consisting of Chainlink nodes. Each reference contract stores the latest and the historical price of an asset in the form of an exchange rate (e.g. RON/USD), which smart contracts can then query on-demand. Each Chainlink Price Feed runs on a specific blockchain network and regularly updates with fresh data based on predefined parameters. 

## Prerequisites

Before you begin, make sure you have:

- A [Ronin RPC](/developers/network) endpoint
- A feed contract address: This determines which data feed your smart contract will read. You can find the available contract addresses [here](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ronin&page=1). For our examples we're using RON/USD `0x0B6074F21488B95945989E513EFEA070096d931D`.
  

## Reading data feeds onchain

These code example demonstrates how to deploy a consumer contract onchain that reads a data feed and stores the value.

### Solidity

To consume price data, your smart contract should reference `AggregatorV3Interface`, which defines the external functions implemented by Data Feeds.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED
 * VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/**
 * If you are reading data feeds on L2 networks, you must
 * check the latest answer from the L2 Sequencer Uptime
 * Feed to ensure that the data is accurate in the event
 * of an L2 sequencer outage. See the
 * https://docs.chain.link/data-feeds/l2-sequencer-feeds
 * page for details.
 */

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    constructor() {
        dataFeed = AggregatorV3Interface(
            0x0B6074F21488B95945989E513EFEA070096d931D
        );
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
```

The `latestRoundData` function returns five values representing information about the latest price data. See Chainlink's [Data Feeds API Reference](https://docs.chain.link/data-feeds/api-reference) for more details.

## Reading data feeds offchain

These code examples demonstrate how to read data feeds directly off chain using Web3 packages for each language.

### Javascript

<Tabs groupId="libraries">
  <TabItem value="ethers.js" label="ethers.js" default>

  ```javascript
import { ethers } from "ethers";

// Replace with a valid Ronin RPC URL
const RONIN_RPC_URL = "https://api.roninchain.com/rpc";
const provider = new ethers.JsonRpcProvider(RONIN_RPC_URL);

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]
const addr = "0x0B6074F21488B95945989E513EFEA070096d931D"
const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider)
priceFeed.latestRoundData().then((roundData) => {
  // Do something with roundData
  console.log("Latest Round Data", roundData)
})
  ```

  </TabItem>
  <TabItem value="web3.js" label="web3.js" default>

  ```javascript
const Web3 = require("web3")
const web3 = new Web3("https://api.roninchain.com/rpc")
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]
const addr = "0x0B6074F21488B95945989E513EFEA070096d931D"
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
priceFeed.methods
  .latestRoundData()
  .call()
  .then((roundData) => {
    // Do something with roundData
    console.log("Latest Round Data", roundData)
  })
  ```

  </TabItem>
</Tabs>

## Need Help?

Check out the following links to get started with Chainlink Price Feeds.
- [Getting Help](https://docs.chain.link/resources/getting-help?parent=dataFeeds)
- [Chainlink Data Feeds document](https://docs.chain.link/data-feeds)
- [Chainlink Website](https://chain.link/)
