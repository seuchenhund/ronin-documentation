---
description: Learn the token requirements to integrate with CCIP
slug: /apps/ccip-bridge/smart-contract-requirements
title: ERC-20 Smart Contract Requirements
toc_max_heading_level: 2
---

## Overview

Before enabling an ERC20-compatible token in CCIP, it's important to understand the requirements it must fulfill to integrate with CCIP.

## Token Administrator address requirement

The token contract must provide an easy way to obtain the token administrator address. This can be achieved if the token contract includes **one of the following functions**:

* **owner()**: This function returns the token contract owner's address. **We recommend using this function.**
* **getCCIPAdmin()**: This function returns the token administrator's address if it differs from the contract owner's.

## Requirements for CCIP token transfers

The token's smart contract must meet minimum requirements to integrate with CCIP.

### Burn & Mint Requirements
* The token smart contract must have the following functions:
  * **mint(address account, uint256 amount)**: This function is used to mint the amount of tokens to a given **account** on the destination blockchain.
  * **burn(uint256 amount)** / **burn(address account, uint256 amount)**: This function is used to burn the amount of tokens on the source blockchain.
  * **decimals()**: Returns the token's number of decimals.
* On the source and destination blockchains, the token contract must support granting **mint and burn** permissions. The token issuers or another role (such as the token administrator) will grant these permissions to the token pool.
### Lock & Mint Requirements
* The token smart contract must have the following function:
  * **decimals()**: Returns the token's number of decimals.
* On the destination blockchain, The token contract must support granting mint and burn permissions described above. The token issuers or another role (such as the token administrator) will grant these permissions to the token pool.

:::info
**If you don't have an existing token**: For all blockchains where tokens need to be burned and minted (for example, the source or destination chain in the case of Burn and Mint, or the destination blockchain in the case of Lock and Mint), Chainlink provides a [BurnMintERC677](https://github.com/smartcontractkit/ccip/blob/ccip-develop/contracts/src/v0.8/shared/token/ERC677/BurnMintERC677.sol) contract that you can use to deploy your token in minutes. This token follows the [ERC677](https://github.com/ethereum/EIPs/issues/677) or [ERC777](https://ethereum.org/en/developers/docs/standards/tokens/erc-777/), allowing you to use it as-is or extend it to meet your specific requirements. You can also use a standard **ERC-20** as long as it meets the above specifications.
:::