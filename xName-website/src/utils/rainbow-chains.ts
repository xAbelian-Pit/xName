// Custom chains for Rainbow

import { Chain } from '@rainbow-me/rainbowkit'

// export const avalancheChain: Chain = {
//   id: 43114,
//   name: 'Avalanche',
//   network: 'avalanche',
//   iconUrl: 'https://example.com/icon.svg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Avalanche',
//     symbol: 'AVAX',
//   },
//   rpcUrls: {
//     default: 'https://api.avax.network/ext/bc/C/rpc',
//   },
//   blockExplorers: {
//     default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//     etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//   },
//   testnet: false,
// };

export const avalancheFujiChain: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  iconUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax-test.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
  testnet: true,
}

export const localEvm1: Chain = {
  id: 31337,
  name: 'Local EVM 1',
  network: 'ethereum',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: { default: 'http://127.0.0.1:8545/' },
  testnet: true,
}

export const localEvm2: Chain = {
  id: 137,
  name: 'Local EVM 2',
  network: 'polygon',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: { default: 'http://127.0.0.1:8546/' },
  testnet: true,
}

export const localEvm3: Chain = {
  id: 43114,
  name: 'Local EVM 3',
  network: 'avalanche',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: { default: 'http://127.0.0.1:8547/' },
  testnet: true,
}

export const fantomChain: Chain = {
  id: 250,
  name: 'Fantom',
  network: 'fantom',
  iconUrl: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg',
  iconBackground: '#3367F6',
  nativeCurrency: {
    decimals: 18,
    name: 'Fantom',
    symbol: 'FTM',
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/fantom',
  },
  blockExplorers: {
    default: { name: 'FTMScan', url: 'https://ftmscan.com/' },
    etherscan: { name: 'FTMScan', url: 'https://ftmscan.com/' },
  },
  testnet: false,
}

export const fantomTestnetChain: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom_testnet',
  iconUrl: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg',
  iconBackground: '#3367F6',
  nativeCurrency: {
    decimals: 18,
    name: 'Fantom',
    symbol: 'FTM',
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/fantom_testnet',
  },
  blockExplorers: {
    default: { name: 'FTMScan', url: 'https://testnet.ftmscan.com/' },
    etherscan: { name: 'FTMScan', url: 'https://testnet.ftmscan.com/' },
  },
  testnet: true,
}
