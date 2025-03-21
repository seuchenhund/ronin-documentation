---
title: Gold Standard Checklist
description: Use this checklist to ensure a successful integration for deploying your dApp on Ronin.
---

## Introduction

The Gold Standard Checklist serves as a guide for developers looking to align their projects with the expectations of the Ronin Ecosystem team. It outlines key requirements and milestones that, when met, increase a project's chances of gaining visibility, securing product showcases, and qualifying for grants. By following this checklist, developers can ensure their projects meet the highest standards of quality, security, and ecosystem compatibility.

## Security

### Smart Contracts

- [ ] Use battle-tested libraries like OpenZeppelin for secure contract implementations.
- [ ] Use `reentrancyGuard` or equivalent mechanisms to prevent reentrancy attacks.
- [ ] Restrict privileged functions using `onlyOwner` or role-based access control.
- [ ] If using proxy patterns, ensure upgradeability mechanisms are well-secured.
- [ ] Run unit tests, property-based tests, and get third-party audits before deployment.
- [ ] Protect admin functions with multi-signature wallets and time delays.
- [ ] Follow operational security practices by using a separate deployer address for the mainnet deployment.
- [ ] Verify deployed contracts on testnet and mainnet.

### dApps

- [ ] Sanitize all user inputs and escape outputs to prevent malicious injections to protect against Cross-Site Scripting (XSS).
- [ ] Use Content Security Policies (CSP).
- [ ] Use CSRF tokens for API endpoints handling sensitive operations.
- [ ] Validate Blockchain Data Properly. Do not trust user-provided data. Always fetch and verify on-chain data directly.
- [ ] Use [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) for signed messages and always display clear signing prompts to users.
- [ ] Regularly audit and update third-party packages to patch vulnerabilities.

## User Experience

- [ ] Ensure smooth user onboarding by integrating [Ronin Waypoint](https://www.roninchain.com/waypoint) for account creation and sign-in.
- [ ] Support [Ronin Wallet](https://wallet.roninchain.com) for all blockchain-specific interactions.
- [ ] Allow users to explore key app features without requiring immediate wallet connection.
- [ ] Optimize UX for both desktop and mobile.
- [ ] Provide clear error messages and recovery options for failed transactions or interactions.
- [ ] Clearly outline how user data is handled and ensure compliance with best privacy practices.

## Scalability

- [ ] Design contracts with modular architecture to allow upgrades while maintaining efficiency.
- [ ] Offload heavy computation, indexing, and RPC requests to [trusted service providers](/developers/tools/node-providers).
- [ ] Use load balancers to distribute traffic efficiently.
- [ ] Load images, scripts, and stylesheets from a CDN to improve speed.
- [ ] Load test your app for high traffic scenarios to identify bottlenecks and optimize performance. 

## Social & Community Engagement

- [ ] Maintain an active presence on [Twitter/X](https://x.com/) to share updates and engage the community.
- [ ] Create a [Discord](https://discord.com/) server for real-time discussions, support, and community building.
- [ ] Join the [Ronin Discord](https://discord.com/invite/roninnetwork) server and the [Ronin Builders Discord](https://discord.com/invite/uPBzMqYJWe) server to engage with the whole Ronin community.
- [ ] Share regular updates, milestones, and roadmap changes with the community.
- [ ] Build partnerships and integrations with other ecosystem projects.

## Nice to have

- [ ] Implement support for the [delegate.xyz](https://delegate.xyz/) registry on Ronin to enhance delegation capabilities.
- [ ] Enable wallet connection with support for the SAFE Core SDK to facilitate seamless integration with the Ronin Multisig
- [ ] Add your project to our [Github dApp directory repository](https://github.com/ronin-chain/dapp-directory).
- [ ] Provide full support for the [Saigon Testnet](https://saigon-app.roninchain.com), allowing developers and users to test products in a controlled environment.
- [ ] Expand accessibility by offering language options for a global audience.