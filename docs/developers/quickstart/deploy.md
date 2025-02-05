---
title: Deploying a smart contract
description: Learn how to deploy your first smart contract with Foundry.
---

## Introduction

This guide will walk you through deploying a smart contract on the Ronin network using [Foundry](https://book.getfoundry.sh/). Foundry is a fast, portable, and modular toolkit for smart contract development.

## Prerequisites

Before you begin, ensure you have:

- **Foundry installed** ([Installation Guide](https://book.getfoundry.sh/getting-started/installation))
- **A wallet private key** with sufficient RON for deployment gas fees

## 1. Create a New Foundry Project

```sh
forge init my-ronin-contract
cd my-ronin-contract
```

## 2. Write a Simple Smart Contract

Navigate to `src/Counter.sol` and replace its content with:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function add(uint256 value) public {
        count += value;
    }
}
```

## 3. Configure Foundry for Ronin

Edit `foundry.toml` to include:

```toml
[rpc_endpoints]
ronin = "https://api.roninchain.com/rpc"
```

:::info Public RPC endpoints
Check out our [Network information](/developers/network) to find a list of public RPC endpoints.
:::

## 4. Update the test file

By default, Foundry includes a test file in the `test` directory, which might cause build failures. Update `test/Counter.t.sol` with the following content or alternatively add the `--skip test` flag in step 5.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }

    function testAdd() public {
        counter.add(5);
        assertEq(counter.count(), 5);
    }
}
```

## 5. Compile the Smart Contract

Run the following command to compile your contract:

```sh
forge build
```

## 6. Deploy the Contract

Use your private key to deploy the contract:

```sh
forge create --rpc-url ronin --private-key 0xYourPrivateKey src/Counter.sol:Counter --legacy
```

This will return a contract address upon successful deployment.

## 7. Verify Deployment

You can verify the deployment by calling the `count` function:

```sh
cast call 0xContractAddress "count()(uint256)" --rpc-url ronin
```

## 8. Interact with the add Function

You can call the `add` function to increase the counter by a specified value:

```sh
cast send 0xContractAddress "add(uint256)" 3 --rpc-url ronin --private-key 0xYourPrivateKey --legacy
```

This will add 3 to the current counter value.

To check the updated count:

```sh
cast call 0xContractAddress "count()(uint256)" --rpc-url ronin
```

## Conclusion

You’ve successfully deployed a smart contract on the Ronin network using Foundry. Next, you can interact with your contract, write tests, or explore more advanced Foundry features!