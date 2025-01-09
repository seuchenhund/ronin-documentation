import React from 'react'

import { Card } from './Card'
import BlogIcon from './blog.svg'
import BoxTickIcon from './box-tick.svg'
import ProtocolIcon from './protocol.svg'
import DevelopersIcon from './developers.svg'
import ListViewIcon from './list-view.svg'
import CoinsIcon from './coins.svg'

const featureList = [
  {
    title: 'Basics',
    Icon: ListViewIcon,
    link: {
      href: '/basics',
      title: 'Basics',
    },
    description: <>Get familiar with the basics of the Ronin chain.</>,
  },
  {
    title: 'Protocol',
    Icon: ProtocolIcon,
    link: {
      href: '/apps',
      title: 'dApps',
    },
    description: <>Details about the Ronin consensus protocol.</>,
  },
  {
    title: 'Developers',
    Icon: DevelopersIcon,
    link: {
      href: '/developers/network',
      title: 'Developers',
    },
    description: <>Start building on Ronin.</>,
  },
  {
    title: 'Delegators',
    Icon: CoinsIcon,
    link: {
      href: '/protocol/delegators',
      title: 'Delegators',
    },
    description: <>Stake your RON tokens to validators to earn rewards.</>,
  },
  {
    title: 'Validators',
    Icon: BoxTickIcon,
    description: <>Run a validator node to earn rewards and secure the network.</>,
    link: {
      href: '/protocol/validators',
      title: 'Validators',
    },
  },
  {
    title: 'Technical blog',
    Icon: BlogIcon,
    description: <>Stay up to date with the latest technical updates on Ronin.</>,
    link: {
      href: '/blog',
      title: 'Technical blog',
    },
  },
]

export const Features: React.FC = () => {
  return (
    <section className="container">
      <div className="row">
        {featureList.map((props, idx) => (
          <Card key={idx} {...props} iconColor="var(--ifm-color-primary-dark)" />
        ))}
      </div>
    </section>
  )
}
