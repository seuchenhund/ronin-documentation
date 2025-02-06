import React from 'react'

import { Card } from './Card'
import CommunityIcon from './community.svg'
import BoxTickIcon from './box-tick.svg'
import StackIcon from './stack.svg'
import CoinsIcon from './coins.svg'
import FireIcon from './fire.svg'
import WalletIcon from './wallet.svg'
import RoninLogoIcon from './ronin-logo.svg'
import ContractIcon from './deploy-contract.svg'
import NodeIcon from './server.svg'
import ToolsIcon from './tools.svg'
import GiftIcon from './gift.svg'
import BoltIcon from './bolt.svg'
import DevelopersIcon from './developers.svg'
import StorefrontIcon from './storefront.svg'
import ShoppingcartIcon from './shoppingcart.svg'

const getStartedList = [

  {
    title: 'Acquire RON',
    Icon: RoninLogoIcon,
    link: {
      href: '/basics/acquire-ron',
      title: 'Acquire RON',
    },
    description: <>Install the Ronin wallet and get our native ecosystem token.</>,
  },
  {
    title: 'Stake RON',
    Icon: CoinsIcon,
    link: {
      href: '/protocol/delegators/become-delegator',
      title: 'Stake RON',
    },
    description: <>Stake your RON to help secure the network while earning rewards.</>,
  },
  {
    title: 'Join the community',
    Icon: CommunityIcon,
    link: {
      href: '/basics/community',
      title: 'Join the community',
    },
    description: <>Stay informed on the latest Ronin news, events, and programs.</>,
  },

]

const startBuildingList = [
  {
    title: 'Quickstart',
    Icon: BoltIcon,
    link: {
      href: '/developers/quickstart',
      title: 'Quickstart',
    },
    description: <>Get started quickly using our guides, covering reading and writing data to the network, as well as deploying smart contracts.</>,
  },
  {
    title: 'Explore the Ronin Developer Console',
    Icon: DevelopersIcon,
    link: {
      href: 'https://developers.roninchain.com/console',
      title: 'Explore the Ronin Developer Console',
    },
    description: <>Deploy, sell & list NFTs with no-code tools. Access Sky Mavis suite of products for distribution.</>,
  },
  {
    title: 'Set up a node',
    Icon: NodeIcon,
    link: {
      href: '/developers/nodes',
      title: 'Set up a node',
    },
    description: <>Deploy a mainnet or testnet node to query the blockchain without limitations.</>,
  },
  {
    title: 'Deploy a smart contract',
    Icon: ContractIcon,
    link: {
      href: '/developers/smart-contracts/deploy',
      title: 'Deploy a smart contract',
    },
    description: <>Learn more about deploying and verifying your contracts.</>,
  },
  {
    title: 'Discover services & tools',
    Icon: ToolsIcon,
    link: {
      href: '/developers/tools',
      title: 'Discover tools',
    },
    description: <>Use Ronin ecosystem services and tools to quickly build a project prototype.</>,
  },
  /*
  {
    title: 'Technical blog',
    Icon: BlogIcon,
    description: <>Stay up to date with the latest technical updates on Ronin.</>,
    link: {
      href: '/blog',
      title: 'Technical blog',
    },
  },
  */
]

const uxList = [
  {
    title: 'Add Ronin Waypoint',
    Icon: BoxTickIcon,
    link: {
      href: 'https://roninchain.com/waypoint-developers',
      title: 'Add Ronin Waypoint',
    },
    description: <>Onboard both Web2 and Web3 users to your project via Ronin Waypoint.</>,
  },
  {
    title: 'Use gas sponsorship',
    Icon: FireIcon,
    link: {
      href: 'https://docs.skymavis.com/mavis/ronin-waypoint/guides/sponsor-gas',
      title: 'Use gas sponsorship',
    },
    description: <>Enable gas sponsorship for a frictionless onboarding experience.</>,
  },
  {
    title: 'Integrate the Ronin Wallet',
    Icon: WalletIcon,
    link: {
      href: 'https://docs.skymavis.com/ronin/wallet/overview',
      title: 'Integrate the Ronin Wallet',
    },
    description: <>Learn how to integrate the Ronin wallet to your project.</>,
  },
];

const monetizeList = [
  {
    title: 'List a collection on Ronin Market',
    Icon: StorefrontIcon,
    link: {
      href: 'https://docs.skymavis.com/mavis/mavis-market/overview',
      title: 'List a collection on Ronin Market',
    },
    description: <>Sell your collection on our launchpad or list your NFTs for secondary trading.</>,
  },
  {
    title: 'Set up sales on Ronin Store',
    Icon: ShoppingcartIcon,
    link: {
      href: 'https://docs.skymavis.com/mavis/mavis-store/overview',
      title: 'Set up sales on Ronin Store',
    },
    description: <>Sell in-game items to players, including both on-chain and off-chain items.</>,
  },
];

const growList = [
  {
    title: 'Apply for a grant',
    Icon: GiftIcon,
    link: {
      href: 'https://roninchain.com/grants-program',
      title: 'Apply for a grant',
    },
    description: <>Explore funding and get the resources you need to build your innovative project.</>,
  },
  {
    title: 'Explore zkEVM',
    Icon: StackIcon,
    link: {
      href: 'https://roninchain.com/zkevm',
      title: 'Explore zkEVM',
    },
    description: <>Launch your own digital nation on the largest Web3 network for gamers.</>,
  },
];

export const Features: React.FC = () => {
  return (
    <section className="container ftContainer">
      <div className="row">
        <h2>Get started</h2>
      </div>
      <div className="row">
        {getStartedList.map((props, idx) => (
          <Card key={idx} {...props} iconColor="var(--ifm-color-primary-dark)" />
        ))}
      </div>
      <div className="row">
        <h2>Start building</h2>
      </div>
      <div className="row">
        {startBuildingList.map((props, idx) => (
          <Card key={idx} {...props} iconColor="var(--ifm-color-primary-dark)" />
        ))}
      </div>
      <div className="row">
        <h2>Improve the user experience</h2>
      </div>
      <div className="row">
        {uxList.map((props, idx) => (
          <Card key={idx} {...props} iconColor="var(--ifm-color-primary-dark)" />
        ))}
      </div>
      <div className="row">
        <h2>Start monetizing</h2>
      </div>
      <div className="row">
        {monetizeList.map((props, idx) => (
          <Card key={idx} {...props} iconColor="var(--ifm-color-primary-dark)" />
        ))}
      </div>
      <div className="row">
        <h2>Grow your project</h2>
      </div>
      <div className="row">
        {growList.map((props, idx) => (
          <Card key={idx} {...props} iconColor="var(--ifm-color-primary-dark)" />
        ))}
      </div>
    </section>
  )
}
