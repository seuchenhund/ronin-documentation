---
title: Gas Suggestion API overview
description: Learn how to make real-time gas price estimations based on network conditions.
---

The EIP-1559 Gas Suggestion API is applicable to all EIP-1559-compatible EVM chains. It provides real-time gas price estimations based on network conditions. The response consists of two key components:

1. Base Fee Per Gas
2. Suggestion Tiers, which include:
   * Max Priority Fee Per Gas (also known as `miner_tip`)
   * Max Fee Per Gas (also referred to as `effective gas price`)

_This document is specifically tailored for Ronin network. On other EIP-1559 chains, the default settings / fallbacks might be different._

## Base Fee Per Gas

* Represents the portion of gas fees that will be burned by the network.
* It is not received by validators.
* On the Ronin chain (post-hardfork), the default `base_fee_per_gas` is **1 GWEI**. Any transaction with a lower gas price will be dropped.
* The API calculates the base fee using the **average base fee from the 20 most recent blocks**, defaulting to **1 GWEI** if the calculated value is lower.
* The API buffers this value by multiplying it by **2**, following the [Ethers v6 implementation](https://github.com/ethers-io/ethers.js/blob/0195f440e35d11f84874f58d80b2071f52c4b17f/src.ts/providers/abstract-provider.ts#L949).

**Pseudo Code for Calculation:**

```
base_fee_per_gas = max(1_000_000_000, avg_20_recent_block_base_fee) * 2
```

## Max Priority Fee Per Gas (Miner Tip)

* This is the portion of the gas fee given to the block validator.
* On the Ronin chain (post-hardfork), the default `priority_fee_per_gas` is **20 GWEI**. Any transaction below this threshold will be dropped.
* The miner tip is determined by averaging the miner tips from the **20 most recent blocks**. If the calculated value falls below **20 GWEI**, it defaults to **20 GWEI**.

**Pseudo Code for Calculation:**

```
max_priority_fee_per_gas = max(20_000_000_000, avg_20_recent_miner_tip)
```

## Max Fee Per Gas (Effective Gas Price)

* Calculated as the sum of `max_priority_fee_per_gas` and `base_fee_per_gas`.
* This represents the **total gas price** for a transaction.

**Pseudo Code for Calculation:**

```
max_fee_per_gas = max_priority_fee_per_gas + base_fee_per_gas
```

## Calculation Process

The Gas Suggestion API uses `eth_feeHistory` to estimate gas prices:

**RPC Call Example:**

```bash
curl --location 'https://saigon-testnet.roninchain.com/rpc' \
--header 'Content-Type: application/json' \
--data '{
    "method": "eth_feeHistory",
    "params": [
        20, //the number of current blocks 
        "latest",
        [
            60 // fee_history_reward_percentiles
        ]
    ],
    "id": 1,
    "jsonrpc": "2.0"
}'
```

**Expected Response Model:**

```
type FeeHistory struct {
    OldestBlock  *big.Int     // First block in response
    Reward       [][]*big.Int // Priority fees per transaction per block
    BaseFee      []*big.Int   // Base fees per block
    GasUsedRatio []float64    // Gas usage ratio per block
}
```

* The length of `Reward` corresponds to the length of `fee_history_reward_percentiles`. In this case, `[60]` is used.
* The average `base_fee_per_gas` is calculated using the `BaseFee` list.
* The `base_fee_per_gas` is then **buffered by multiplying it by 2**, applicable to both medium and high tiers.
* The **medium tier** `max_priority_fee_per_gas` is derived from `Reward[0]` (since `fee_history_reward_percentiles` contains a single value).
* The **high tier** `max_priority_fee_per_gas` is determined by multiplying the medium-tier value by 1.2 (default buffer index).
* For each tier, `max_fee_per_gas` is calculated by summing `base_fee_per_gas` and `max_priority_fee_per_gas`.


**Gas suggestion Response Model:**

```
{
    "chain_name": "ronin-testnet",
    "type": "eip-1559",
    "base_fee_per_gas": "2000000000",
    "medium": {
        "max_priority_fee_per_gas": "20000000000",
        "max_fee_per_gas": "22000000000"
    },
    "high": {
        "max_priority_fee_per_gas": "24000000000",
        "max_fee_per_gas": "26000000000"
    }
}
```

## Caveats

* The high-tier miner tip is calculated as `medium_tier_miner_tip * 1.2`. However, if network congestion is extreme or gas price distribution is uneven, this approach may fail.
* A possible alternative is increasing the number of items in `fee_history_reward_percentiles`, e.g., using `[60, 100]`.
* In such an implementation, `Reward[0]` contains the medium-tier miner tips, while `Reward[1]` contains the high-tier ones.
* However, this approach is rarely necessary in production, as the Ronin network has not experienced chain hangs or heavy congestion. Additionally, users can manually set their own gas prices.

**Alternative RPC Call Example:**

```bash
curl --location 'https://saigon-testnet.roninchain.com/rpc' \
--header 'Content-Type: application/json' \
--data '{
    "method": "eth_feeHistory",
    "params": [
        20,
        "latest",
        [60, 100]
    ],
    "id": 1,
    "jsonrpc": "2.0"
}'
```