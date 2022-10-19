export enum ChainId {
  ETHEREUM = 1,
  OPTIMISM = 10,
  POLYGON = 137,
  FANTOM = 250,
  ARBITRUM = 42161,
  // AVALANCHE = 43114,
  // testnets
  GOERLI = 5,
  FANTOM_TESTNET = 4002,
}

export const ChainIds: { [name: string]: number } = {
  ETHEREUM: 1,
  OPTIMISM: 10,
  POLYGON: 137,
  FANTOM: 250,
  ARBITRUM: 42161,
  // AVALANCHE: 43114,
  // testnets
  GOERLI: 5,
  FANTOM_TESTNET: 4002,
}

export const ChainIdsReverse: { [id: number]: string } = Object.fromEntries(Object.entries(ChainIds).map((a) => a.reverse()))

export const SupportedChains = Object.keys(ChainIds)

export const SupportedChainIds = Object.values(ChainIds)

// FROM: https://www.ankr.com/rpc/
export const ChainRpc = {
  1: 'https://rpc.ankr.com/eth',
  10: 'https://rpc.ankr.com/optimism',
  137: 'https://rpc.ankr.com/polygon',
  250: 'https://rpc.ankr.com/fantom',
  42161: 'https://rpc.ankr.com/arbitrum',
  // 43114: 'https://rpc.ankr.com/avalanche',
  // testnets
  5: 'https://rpc.ankr.com/eth_goerli',
  4002: 'https://rpc.ankr.com/fantom_testnet',
}

export const ExplorerEndpoint = {
  1: 'https://api.etherscan.io/api',
  10: 'https://api-optimistic.etherscan.io/api',
  137: 'https://api.polygonscan.com/api',
  250: 'https://api.ftmscan.com/api',
  42161: 'https://api.arbiscan.io/api',
  // 43114: 'https://api.snowtrace.io/api',
  // testnets
  5: 'https://api-goerli.etherscan.io/api',
  4002: 'https://api-testnet.ftmscan.com/api',
}

export const ExplorerApiKey = {
  1: process.env.REACT_APP_EXPLORER_API_KEY_ETHEREUM,
  10: process.env.REACT_APP_EXPLORER_API_KEY_OPTIMISM,
  137: process.env.REACT_APP_EXPLORER_API_KEY_POLYGON,
  250: process.env.REACT_APP_EXPLORER_API_KEY_FANTOM,
  42161: process.env.REACT_APP_EXPLORER_API_KEY_ARBITRUM,
  // 43114: process.env.REACT_APP_EXPLORER_API_KEY_AVALANCHE,
  // testnets
  5: process.env.REACT_APP_EXPLORER_API_KEY_ETHEREUM,
  4002: process.env.REACT_APP_EXPLORER_API_KEY_FANTOM,
}
