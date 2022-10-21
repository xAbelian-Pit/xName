import deployedMock from './deployed-mock.json'
import deployedTestnet from './deployed-testnet.json'

export const registryContractAddress: { [key: number]: string } = {
  // localhost
  // 1: deployedMock.evm1, // local evm 1
  // 31337: deployedMock.evm1, // local evm 1 (hardhat)
  // 137: deployedMock.evm2, // local evm 2
  // 43114: deployedMock.evm3, // local evm 3
  // testnets
  5: deployedTestnet.evm1, // ethereum goerli
  80001: deployedTestnet.evm2, // polygon mumbai
  43113: deployedTestnet.evm3, // avalanche fuji
  1001: deployedTestnet.evm4, // klaytn baobab
}

export const registryChainNames: { [key: number]: string } = {
  // 1: 'ethereum',
  // 31337: 'ethereum',
  // 137: 'polygon',
  // 43114: 'avalanche',
  5: 'ethereum', // goerli
  80001: 'polygon', // mumbai
  43113: 'avalanche', // fuji
  1001: 'klaytn', // baobab
}
