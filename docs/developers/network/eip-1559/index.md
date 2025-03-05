---
title: EIP-1559
description: Ronin is preparing for an upcoming hardfork that will introduce EIP-1559
---

Ronin is preparing for an upcoming hardfork that will introduce a base fee mechanism for gas pricing, in line with EIP-1559. This update will improve fee predictability and network efficiency by changing how gas prices are calculated.

The Ronin mainnet hardfork is expected to go live on **March 17th** at block [43447600](https://app.roninchain.com/block/43447600). Saigon testnet has already been updated. We encourage you to test and adjust your applications in advance.

## What's Changing?

* Before the hardfork: The minimum gas price is 20 gwei.
* After the hardfork: The minimum gas price will be 20 gwei + base fee.
* The base fee starts at 1 gwei but can increase based on network congestion.

## Why EIP-1559?

EIP-1559 introduces a dynamic fee structure, offering several benefits:
* Better fee estimation: The base fee adjusts automatically, reducing the risk of overpaying.
* Network stability: Helps prevent gas price spikes during high traffic.
* More efficient transactions: Encourages optimal gas usage and reduces unnecessary bidding wars.

:::danger Action Required!
If your application hardcodes gas prices at 20 gwei, update it to accommodate the new base fee mechanism.
:::

## How to detect if EIP-1559 is applied

The Ronin mainnet hardfork is expected to go live on **March 17th** at block [43447600](https://app.roninchain.com/block/43447600). To ensure a smooth transition in your application, you can switch the logic, based on the block number or use the following methods.

### JSON RPC

By calling `eth_feeHistory`, you can automatically check whether EIP-1559 is applied. If `baseFeePerGas` is `0x0`, the upgrade has not yet happened. If `baseFeePerGas` returns a nonzero value, EIP-1559 is active.

#### Before the hard fork (Ronin mainnet example):

```
curl -X POST https://api.roninchain.com/rpc \
-H "Content-Type: application/json" \
-d '{"jsonrpc": "2.0","method": "eth_feeHistory", "params": [1, "latest", []], "id": 1}'
```

Response

```
{"jsonrpc":"2.0","id":1,"result":{"baseFeePerGas":["0x0","0x0"], ... }}
```

####  After the hard fork (Saigon testnet example):

```
curl -X POST https://saigon-testnet.roninchain.com/rpc \
-H "Content-Type: application/json" \
-d '{"jsonrpc": "2.0", "method": "eth_feeHistory","params": [1, "latest", []], "id": 1}'
```

Response

```
{"jsonrpc":"2.0","id":1,"result":{"baseFeePerGas":["0x3b9aca00","0x3b9aca00"], ... }}
```

### Ethers v6 example

In Ethers v6 `provider.getFeeData()` can be used:

```
import { ethers } from "ethers";

/*
const RPC_ENDPOINT = "https://api.roninchain.com/rpc";
const NETWORK = new ethers.Network("ronin", "2020");
*/

const RPC_ENDPOINT = "https://saigon-testnet.roninchain.com/rpc";
const NETWORK = new ethers.Network("saigon", "2021");

(async () => {

  const provider = new ethers.JsonRpcProvider(RPC_ENDPOINT, NETWORK, {
    staticNetwork: NETWORK,
  });

  const feeData = await provider.getFeeData();

  if(feeData?.maxFeePerGas && feeData?.maxPriorityFeePerGas){
    console.log("EIP1559 supported");
  }else{
    console.log("use legacy gas pricing");
  }

})(); 
```

## See also

- [Gas Suggestion API overview](./gas-suggestion)
