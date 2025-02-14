---
title: List NFT collection using Developer Console
description: Learn how to list your own NFT collections on the Ronin Market by using the Ronin Developer Console.
---


## Introduction
The Ronin Developer Console allows you to list your NFT collection on the Ronin Market. This guide provides a step-by-step process to help you with the listing. The review process typically takes 24 hours on working days, after which your collection will be visible and tradable.

## Prerequisites
Before listing your collection, ensure you have the following:
- An NFT contract (ERC1155 or ERC721) deployed on Ronin Mainnet or Saigon Testnet.
- Access to the NFT contract owner's address via your Ronin Wallet for signing the request.

## Step 1: Access Collection Listing in the Ronin Developer Console
1. Log in to the [Ronin Developer Console](https://developer.roninchain.com/).
2. Select your Project.
3. Navigate to **Ronin Marketplace > NFT Collection Listing**.

## Step 2: Create an NFT Listing Request
1. Choose the network for your listing:
   - **Ronin Mainnet**: Requires a 24-hour approval process (on working days). Upon approval, your collection becomes available on Ronin Market.
   - **Saigon Testnet**: Allows testing and previewing metadata, banners, and avatars. Collections are instantly available upon submission.
2. Click **“List New Collection”** (top right corner).
3. In the **Draft Collection Information** dialog, enter:
   - **Collection Display Name**: Your collection’s name.
   - **Collection Address**: The deployed contract address on the selected blockchain.
4. Click **Create Draft Collection**.

## Step 3: Populate Collection Request Details
1. Select the newly created draft collection.
2. Configure the required details:
   - **Slug**: Used to replace the contract address in the url with a readable collection name. Allowed characters: lowercase letters, numbers, hyphens (-), and underscores (_) only.
   - **Show at (UTC)**: When your collection becomes publicly visible.
   - **Tradable at (UTC)**: When trading starts (useful for controlling secondary sales timing).
   - **Creator Name**: The project's creator.
   - **Avatar**: A square image (max file size: 500KB).
   - **Banner**: A banner image (max file size: 1MB).
   - **Optional Fields**: Short description, official website, Discord link, and Twitter/X profile.

## Step 4: Submit the Request
1. The system will display the collection owner address.
2. Connect your **Ronin Wallet** and sign the verification message.
   - **Ownership Verification Methods**:
     - *OpenZeppelin Ownable*: Uses the `owner` field.
     - *OpenZeppelin Access Module*: Uses addresses with admin roles.
3. Click **Sign & Submit**.

## Step 5: Await Review
- Your submission will be reviewed within **24 hours** on working days.
- For support, reach out via the [Ronin Discord Tech Chat](https://discord.gg/ronin).

**Happy listing!**

