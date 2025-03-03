---
description: Bridge ERC-20 tokens from Ethereum to Ronin using Ronin Bridge.
slug: /apps/ronin-bridge/deposit-token
title: Deposit an ERC-20 token
---

## Overview

This guide describes how to use Ronin Bridge to send an ERC-20 token from your Ethereum address to your Ronin Wallet.

## Prerequisites

If you access Ronin Bridge on mobile, remember to import your Ethereum address to your mobile Ronin Wallet. To learn how to do that, see [Importing Your MetaMask Wallet to Ronin Wallet](https://support.roninchain.com/hc/en-us/articles/14862812718107-Importing-Your-MetaMask-Wallet-to-Ronin-Wallet).

## Step 1. Add the sender and recipient addresses

1. Open [Ronin Bridge](https://app.roninchain.com/bridge).
   ![token-deposit-0](../assets/token-deposit-0.png)
2. Select the **From** field and connect the Ethereum wallet that you want to bridge the token from.
   ![token-deposit-1](../assets/token-deposit-1.png)
3. Select the **To** field and enter the Ronin address that you want to bridge the token to. You can also enter the RNS (Ronin Name Service) domain name linked to the address, such as `example.ron`. Make sure to specify the *full RNS name* including the `.ron` domain, so that the system can recognize the linked address.
   ![token-deposit-2](../assets/token-deposit-2.png)
   If the recipient address has an RNS name, the **To** field will automatically show the RNS name instead of the address.
   ![token-deposit-rns](../assets/token-deposit-rns.png)

## Step 2. Choose the token and amount

Choose the ERC-20 token that you want to deposit, then enter the amount manually or select **Max** to bridge the entire balance of this token available in your connected wallet.
![token-deposit-3](../assets/token-deposit-3.png)

## Step 3. Confirm your deposit

1. Review the transaction details, including the gas fees associated with the deposit. Make sure you have enough ETH in your Ethereum wallet to pay gas. If everything looks correct, select **Deposit**.
   ![token-deposit-4](../assets/token-deposit-4.png)
2. When prompted, sign the transaction in your connected wallet.
3. Wait for the transaction to be confirmed by the network. Be patient, however, as transactions can take some time to complete, depending on network congestion and gas fees.
   ![token-deposit-5](../assets/token-deposit-5.png)

## Step 4. Receive the tokens in your Ronin Wallet

When the deposit is complete, you'll see a "Deposit completed" window.
![token-deposit-6](../assets/token-deposit-6.png)
You should be able to see the deposited amount in your Ronin Wallet, on the **Funds** tab in the browser extension, or the **Tokens** tab in the mobile app.
