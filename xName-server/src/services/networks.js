import fs from 'fs'

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

const deployedTest = loadJSON('../constants/deployed-testnet.json')
const deployedMock = loadJSON('../constants/deployed-mock.json')

export const deployedTestNetworks = {
  ethereum: {
    id: 'goerli',
    type: 'evm',
    wormholeChainId: 2,
    rpc: 'https://rpc.ankr.com/eth_goerli',
    // wormhole
    bridgeAddress: '0x706abc4E45D419950511e474C7B9Ed348A4a716c',
    // our contract
    registryAddress: deployedTest.evm1,
  },
  polygon: {
    id: 'mumbai',
    type: 'evm',
    wormholeChainId: 5,
    rpc: 'https://rpc.ankr.com/polygon_mumbai',
    // wormhole
    bridgeAddress: '0x0CBE91CF822c73C2315FB05100C2F714765d5c20',
    // our contract
    registryAddress: deployedTest.evm2,
  },
  avalanche: {
    id: 'avalanche',
    type: 'evm',
    wormholeChainId: 6,
    rpc: 'https://rpc.ankr.com/avalanche_fuji',
    // wormhole
    bridgeAddress: '0x7bbcE28e64B3F8b84d876Ab298393c38ad7aac4C',
    // our contract
    registryAddress: deployedTest.evm3,
  },
  klaytn: {
    id: 'baobab',
    type: 'evm',
    wormholeChainId: 13,
    rpc: 'https://api.baobab.klaytn.net:8651',
    // wormhole
    bridgeAddress: '0x1830CC6eE66c84D2F177B94D544967c774E624cA',
    // our contract
    registryAddress: deployedTest.evm4,
  },
}

export const deployedMockNetworks = {
  ethereum: {
    id: 'goerli',
    type: 'evm',
    wormholeChainId: 2,
    // rpc: 'https://rpc.ankr.com/eth_goerli',
    rpc: 'http://localhost:8545',
    // wormhole
    bridgeAddress: '0x706abc4E45D419950511e474C7B9Ed348A4a716c',
    tokenBridgeAddress: '0xF890982f9310df57d00f659cf4fd87e65adEd8d7',
    // our contract
    registryAddress: deployedMock.evm1,
  },
  polygon: {
    id: 'mumbai',
    type: 'evm',
    wormholeChainId: 5,
    // rpc: 'https://rpc.ankr.com/polygon_mumbai',
    rpc: 'http://localhost:8546',
    // wormhole
    bridgeAddress: '0x7A4B5a56256163F07b2C80A7cA55aBE66c4ec4d7',
    tokenBridgeAddress: '0x5a58505a96D1dbf8dF91cB21B54419FC36e93fdE',
    // our contract
    registryAddress: deployedMock.evm2,
  },
  avalanche: {
    id: 'avalanche',
    type: 'evm',
    wormholeChainId: 6,
    // rpc: 'https://rpc.ankr.com/avalanche_fuji',
    rpc: 'http://localhost:8547',
    // wormhole
    bridgeAddress: '0x54a8e5f9c4CbA08F9943965859F6c34eAF03E26c',
    tokenBridgeAddress: '0x0e082F06FF657D94310cB8cE8B0D9a04541d8052',
    // our contract
    registryAddress: deployedMock.evm3,
  },
}
