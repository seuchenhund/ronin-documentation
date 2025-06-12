// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import math from "remark-math"
import katex from "rehype-katex"

import lightCodeTheme from 'prism-react-renderer/themes/github/index.js';
import darkCodeTheme from 'prism-react-renderer/themes/dracula/index.js';

const currentYear = new Date().getFullYear()

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ronin Docs',
  tagline: 'Stake and earn rewards on Ronin',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.roninchain.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  organizationName: 'axieinfinity', // Usually your GitHub org/user name.
  projectName: 'ronin-documentation', // Usually your repo name.

  staticDirectories: ['static'],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    'docusaurus-plugin-sass',
    ['@docusaurus/plugin-client-redirects',
    {
      redirects: [
        {
          from: '/apps/ccip-bridge/smart-contract-requirements',
          to: '/developers/tools/ccip',
        },
        {
          from: '/basics/rewards',
          to: '/protocol/rewards',
        },
        {
          from: '/basics/roles',
          to: '/protocol/roles',
        },
        {
          from: '/basics/nodes',
          to: '/protocol/nodes',
        },
        {
          from: '/get-started',
          to: '/',
        },
        {
          from: '/developers/nodes/mainnet',
          to: '/developers/nodes/setup',
        },
        {
          from: '/developers/nodes/testnet',
          to: '/developers/nodes/setup',
        },
        {
          from: '/developers/nodes/mainnet-archive',
          to: '/developers/nodes/setup',
        },
        {
          from: '/developers/nodes/testnet-archive',
          to: '/developers/nodes/setup',
        },
        {
          from: '/protocol/validators/setup/mainnet/run-validator',
          to: '/developers/nodes/setup',
        },
        {
          from: '/protocol/validators/setup/mainnet/run-combined',
          to: '/developers/nodes/setup',
        },
        {
          from: '/protocol/validators/setup/testnet/run-combined',
          to: '/developers/nodes/setup',
        },
        {
          from: '/protocol/validators/setup/cli',
          to: '/developers/nodes/build-from-source',
        },
        {
          from: '/protocol/validators/setup/overview',
          to: '/developers/nodes/setup',
        },
      ],
      createRedirects(existingPath) {
        if (existingPath.startsWith('/protocol/delegators/')) {
          // Replace the new path prefix with the old one
          return [
            existingPath.replace('/protocol/delegators/', '/delegators/onboarding/'),
            existingPath.replace('/protocol/delegators/', '/delegators/manage/'),
            existingPath.replace('/protocol/delegators/', '/delegators/'),
            '/docs' + existingPath.replace('/protocol/delegators/', '/delegators/onboarding/'),
            '/docs' + existingPath.replace('/protocol/delegators/', '/delegators/manage/'),
            '/docs' + existingPath.replace('/protocol/delegators/', '/delegators/'),
          ];
        }
        if (existingPath.startsWith('/protocol/validators/')) {
          // Replace the new path prefix with the old one
          return [
            existingPath.replace('/protocol/validators/', '/validators/onboarding/'),
            existingPath.replace('/protocol/validators/', '/validators/'),
            '/docs' + existingPath.replace('/protocol/validators/', '/validators/onboarding/'),
            '/docs' + existingPath.replace('/protocol/validators/', '/validators/'),
          ];
        }
        if (existingPath.includes('/')) {
          return [
            '/docs' + existingPath
          ];
        }
        return undefined; // Return a falsy value: no redirect created
      },
    },]
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl: `https://github.com/axieinfinity/ronin-documentation/edit/main`,
          editLocalizedFiles: false,
          editCurrentVersion: false,
          showLastUpdateTime: true,
        },
        blog: {
          path: 'blog',
          blogTitle: 'Technical blog',
          blogDescription: 'Learn about the latest updates on Ronin',
          routeBasePath: 'blog',
          blogSidebarTitle: 'Technical blog',
          showReadingTime: true,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        gtag: {
          trackingID: 'G-7XP0LK51BJ', // Measurement ID
          anonymizeIP: false,
        },
        googleTagManager: {
          containerId: 'GTM-PSV4LRD', // Tag ID from Google Tag Manager
        },
        googleAnalytics: {
          trackingID: 'UA-150383258-4',
        },        
      }),
    ],
  ],
  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        // Global tags
        {name: 'keywords', content: 'web3, dapp, ronin, axie, axs, ron'},

        // Facebook meta tags
        {name: 'og:url', content: 'https://docs.roninchain.com'},
        {name: 'og:type', content: 'website'},
        // {name: 'og:title', content: 'Ronin Documentation'},
        // {name: 'og:description', content: 'Build web3 games with real, player-owned economies.'},
        {name: 'og:image', content: '/img/thumbnail.png'},
        // Twitter meta tags
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:domain', content: 'docs.roninchain.com'},
        {name: 'twitter:url', content: 'https://docs.roninchain.com'},
        // {name: 'twitter:title', content: 'Ronin Documentation'},
        // {name: 'twitter:description', content: 'Build web3 games with real, player-owned economies.'},
        {name: 'twitter:image', content: '/img/thumbnail.png'},
      ],
      algolia: {
        appId: 'RXU5ZAVMCJ',
        apiKey: '46141953dde60ffc0242ca8e0252dbe8',
        indexName: 'roninchain',
      },
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      /*
      announcementBar: {
        id: 'hardfork',
        content: `Ronin is preparing for an upcoming hardfork at <a href="https://app.roninchain.com/block/43447600">block 43447600</a> that will introduce a base fee mechanism for gas pricing, in line with EIP-1559. <a href="/developers/network/eip-1559/">Learn more</a>.`,
        backgroundColor: '#FFDE81',
        textColor: '#1D273D',
        isCloseable: false,
      },
      */
      navbar: {
        title: 'Ronin',
        logo: {
          alt: 'Ronin logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'Basics',
            to: '/basics',
          },
          {
            label: 'Protocol',
            to: '/protocol',
          },
          {
            label: 'Developers',
            to: '/developers',
          },
          {
            label: 'Blog',
            to: 'blog',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/roninnetwork',
              },
              {
                label: 'X',
                href: 'https://twitter.com/ronin_network',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Ronin brand kit',
                href: 'https://drive.google.com/drive/folders/1ZM0R6fd13IhvBpTFwOBebYZqmTxQNgJi',
              },
              {
                label: 'Support',
                to: 'https://support.roninchain.com/hc/en-us',
              },
            ],
          },
        ],
        copyright: `© ${currentYear - 1} - ${currentYear} Sky Mavis`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
