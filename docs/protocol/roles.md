---
title: Roles
description: Who are delegators, validators, and what they do.
---

## Delegator

A delegator is an individual that delegates their stake to a validator and earns rewards in return. By delegating their stake, delegators can participate in the network and be rewarded without the technical expertise or resources required to run a validator node themselves.

### Stake RON

In Ronin, token holders can choose validators based on various factors such as the performance of the validators and their commission rate.

After choosing the validators, the RON holders can follow the steps in [Stake RON](/protocol/delegators/become-delegator).

## Validator

A validator is an individual or institution that has the following responsibilities:

* Generate blocks: a validator runs the validator node to confirm transactions and generate blocks.
* Act as a chain governor: Governing Validators can propose and vote for changes, such as adding or removing Governing Validators, upgrading smart contracts, and changing thresholds.

### Validator responsibilities

Validators have two responsibilities:
- **Finality Voting.** All validators can participate in finality voting. The voting weight of a validator is proportional to their staked amount.  
- **Block production.** For every epoch (or about every 10 minutes), a set of block procedures are randomly selected to produce blocks, of which 12 are reserved for Governing Validators (which are selected by community). The remaining 10 slots are chosen among the Validator Candidates based on their staked amount. 

### Slashing penalties for validators

Validators who fail to fulfill their responsibilities are subject to [slashing](/protocol/validators/slashing).
