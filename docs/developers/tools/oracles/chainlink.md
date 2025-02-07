---
title: Chainlink Price Feeds
description: Learn how to use Chainlink Price Feeds data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Chainlink](https://chain.link/) Price Feeds are on-chain reference contracts that are automatically updated by decentralized oracle networks (DONs) consisting of Chainlink nodes. Each reference contract stores the latest and the historical price of an asset in the form of an exchange rate (e.g. BTC/USD), which smart contracts can then query on-demand. Each Chainlink Price Feed runs on a specific blockchain network and regularly updates with fresh data based on predefined parameters. 

## Using Chainlink Price Feeds

The code for reading Data Feeds is the same across all EVM-compatible blockchains and Data Feed types. You choose different types of feeds for different uses, but the request and response format are the same. To read a feed, specify the following variables:

- **RPC endpoint URL**: This determines which network that your smart contracts will run on. You can use a [node provider service](https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/) or point to your own [client](https://ethereum.org/en/developers/docs/nodes-and-clients/).
- **LINK token contract address**: The address for the LINK token contract is different for each network. On Ronin, LINK token contract address is `0x3902228d6a3d2dc44731fd9d45fee6a61c722d0b`.
- **Feed contract address**: This determines which data feed your smart contract will read. You can find the available contract addresses [here](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ronin&page=1).
  
This guide shows example code that reads data feeds using the following languages:

- Onchain consumer contracts:
  - Solidity
  - Vyper

- Offchain reads using Web3 packages:
  - Javascript with [web3.js](https://web3js.readthedocs.io/)
  - Python with [Web3.py](https://web3py.readthedocs.io/en/stable/)
  - Golang with [go-ethereum](https://github.com/ethereum/go-ethereum)

## Reading data feeds onchain

These code examples demonstrate how to deploy a consumer contract onchain that reads a data feed and stores the value.

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

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
    }

    /**
     * Returns the latest answer.
     */
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

### Vyper

To consume price data, your smart contract should import `AggregatorV3Interface` which defines the external functions implemented by Data Feeds. You can find it [here](https://github.com/smartcontractkit/apeworx-starter-kit/blob/main/contracts/interfaces/AggregatorV3Interface.vy). You can find a `PriceConsumer` example here. Read the **apeworx-starter-kit** [README](https://github.com/smartcontractkit/apeworx-starter-kit) to learn how to run the example.


## Reading data feeds offchain

These code examples demonstrate how to read data feeds directly off chain using Web3 packages for each language.

### Javascript

<Tabs groupId="libraries">
  <TabItem value="web3.js" label="web3.js" default>

  ```javascript
/**
 * THIS IS EXAMPLE CODE THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS EXAMPLE CODE THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

const Web3 = require("web3") // for nodejs only
const web3 = new Web3("https://rpc.ankr.com/eth_sepolia")
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
const addr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
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
  <TabItem value="ethers.js" label="ethers.js" default>

  ```javascript
/**
 * THIS IS EXAMPLE CODE THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS EXAMPLE CODE THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

const { ethers } = require("ethers") // for nodejs only
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
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
const addr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider)
priceFeed.latestRoundData().then((roundData) => {
  // Do something with roundData
  console.log("Latest Round Data", roundData)
})
  ```

  </TabItem>
</Tabs>

### Python

This example uses [Web3.py](https://web3py.readthedocs.io/en/stable/) to retrieve feed data from the [BTC / USD feed](https://sepolia.etherscan.io/address/0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43) on the Sepolia testnet.

### Golang

You can find an example with all the source files [here](https://github.com/smartcontractkit/smart-contract-examples/tree/main/pricefeed-golang). This example uses [go-ethereum](https://docs.chain.link/data-feeds/using-data-feeds#getting-a-different-price-denomination:~:text=This%20example%20uses-,go%2Dethereum,-to%20retrieve%20feed) to retrieve feed data from the BTC / USD feed on the Sepolia testnet. To learn how to run the example, see the [README](https://github.com/smartcontractkit/smart-contract-examples/blob/main/pricefeed-golang/README.md).

## Need Help?

Check out the following links to get started with Chainlink Price Feeds.
- [Getting Help](https://docs.chain.link/resources/getting-help?parent=dataFeeds)
- [Chainlink Data Feeds document](https://docs.chain.link/data-feeds)
- [Website](https://chain.link/)
- [Twitter](https://x.com/chainlink)
