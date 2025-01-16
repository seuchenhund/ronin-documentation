---
title: Delegation
description: Integrate Delegate.xyz into your dApps on Ronin.
---

Delegate control from a secure cold wallet to a more accessible hot wallet, allowing the hot wallet to perform predefined actions such as signing transactions, managing assets, or interacting with smart contracts.

## Delegate.xyz on Ronin

[Delegate.xyz](https://delegate.xyz)

### Smart contract integration

Typically, a `mint()` or `claim()` function looks like this:

```solidity
function claim() public returns (uint256 tokenId) {
  // 1. Check if `msg.sender` is allowed to claim
  // Use merkle tree, for example

  // 2. Check if `msg.sender` has already claimed

  // 3. Your claim code below using `msg.sender`
  _claim(msg.sender)
}
```

#### Delegate registry contract

The Delegate registry contract is a standalone immutable registry that stores delegated permissions from one address to another. It allows users to delegate permissions for their entire wallet, specific contracts, ERC-721 tokens, ERC-20 tokens, and ERC-1155 tokens. The contract provides a set of functions to delegate and revoke permissions, as well as to check the permissions granted to a delegate.

The smart contract is available at the same address on both the Ronin mainnet and Saigon testnet: [0x00000000000000447e69651d841bd8d104bed493](https://app.roninchain.com/address/0x00000000000000447e69651d841bd8d104bed493).

##### Contract interface

See [IDelegateRegistry.sol](https://docs.delegate.xyz/technical-documentation/delegate-registry/idelegateregistry.sol).

#### Example

Typically, a `mint()` or `claim()` function looks like this:

```solidity
function claim() public returns (uint256 tokenId) {
  // 1. Check if `msg.sender` is allowed to claim
  // Use merkle tree, for example

  // 2. Check if `msg.sender` has already claimed

  // 3. Your claim code below using `msg.sender`
  _claim(msg.sender)
}
```

To integrate Delegate.xyz into your Solidity contract, add a small code block to the preceding step, and pass an optional `_vault` address into the `claim` function.

This example shows how to integrate Delegate.xyz into a Solidity contract for handling delegations when claiming NFTs.

```solidity
address constant public NFT_CONTRACT = 0x0000000000000000000000000000000000000001;

function claim(address _vault) public returns (uint256 tokenId) {
  address requester = msg.sender;

  // Check if `msg.sender` is a permitted delegate of the `_vault` address
  if (_vault != address(0) && _vault != requester) {
    bool isDelegateValid = REGISTRY.checkDelegateForContract(msg.sender, _vault, NFT_CONTRACT, "");
    require(isDelegateValid, "delegation does not exist");

    // Ensuring the NFT will be minted to the `_vault` address
    // By removing this line, contract engineers can also decide
    // to mint the NFT to the delegate `msg.sender`
    requester = _vault;
  }
  // If `_vault` address equals 0x0 or is the same address as `requester`
  // Then ignore the block above, as `requester` is minting on their own behalf

  // Additional validation checks (not implemented)
  // 1. Check if `requester` is allowed to claim
  // 2. Check if `requester` has already claimed

  // Claim logic using `requester`
  _claim(`requester`)
}
```

#### See also

For more examples, see the [official Delegate.xyz documentation](https://docs.delegate.xyz/integrate-in-your-project/smart-contract-examples).

### JavaScript (JS) SDK

#### Installation

```bash
npm install @delegatexyz/sdk viem
```

For writing transactions, we recommend using the Ronin Wallet SDK.

```bash
npm install @roninnetwork/wallet-sdk
```

#### Examples

##### Incoming delegations

This example checks if a specific `to` address is set as a delegate for all tokens of a `from` address.

```javascript
import { http } from "viem";
import { DelegateV2 } from "@delegatexyz/sdk";

(async () => {
  const RPC_URL = "https://api.roninchain.com/rpc";
  const v2 = new DelegateV2(http(RPC_URL));

  const to = "0x0000000000000000000000000000000000000003";
  const from = "0x0000000000000000000000000000000000000001";

  // Check if `to` is a delegate of `from` for the entire wallet
  console.log(await v2.checkDelegateForAll(to, from));
})();
```

##### Outgoing delegations

This example gives permission a the specified `to` address to act on behalf of the user's account for all contracts on Ronin.

```javascript
import { custom } from "viem";
import { ronin } from "viem/chains";
import { DelegateV2 } from "@delegatexyz/sdk";
import { WalletSDK } from "@roninnetwork/wallet-sdk";

(async () => {
  const sdk = new WalletSDK();
  await sdk.connectInjected();
  const accounts = await sdk.requestAccounts();

  const to = "0x0000000000000000000000000000000000000003";

  if (sdk?.getProvider()) {
    const account = accounts[0];
    const v2 = new DelegateV2(custom(sdk.getProvider()), ronin, account);

    // Allow `to` to act on behalf of `account` for all contracts
    console.log(await v2.delegateAll(to, "", true));
  }
})();
```

##### See also

- For a full function overview, see [@delegatexyz/sdk](https://www.npmjs.com/package/@delegatexyz/sdk).
- For more examples, see the [official Delegate.xyz documentation](https://docs.delegate.xyz/technical-documentation/javascript-sdk).

### REST API

`https://api.delegate.xyz/registry/v2/`

Rate limit: 25 requests per 10 seconds.

:::tip
To get an API key to remove the rate limit, visit the [Delegate.xyz API Keys](https://delegate.xyz/developer/api-keys) page.
:::

#### Authentication

If you have an API key, add it to the `X-API-KEY` HTTP header.

#### Examples

To fetch Ronin data, pass the `chainId` query parameter with the value `2020` for the Ronin mainnet or `2021` for the Saigon testnet.

Get a list of incoming delegations:

`GET https://api.delegate.xyz/registry/v2/{0xAddress}?chainId=2020`

Get a list of outgoing delegations:

`GET https://api.delegate.xyz/registry/v2/check/all?from={0xAddressFrom}&to={0xAddressTo}`

#### See also

For more examples, see the [official Delegate.xyz documentation](https://docs.delegate.xyz/technical-documentation/rest-api/v2).
