import {
  providers, utils, Contract, Wallet,
} from 'ethers'
import * as fs from 'fs'
import httpStatus from 'http-status'

import { deployedMockNetworks, deployedTestNetworks } from './networks'
import { ApiError } from '../utils'
import { fetchVaa, retrieveDummyVM } from './vaa'

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
const DotRegistryAbi = loadJSON('../constants/DotRegistry.json')

// const deployedNetworks = deployedMockNetworks
const deployedNetworks = deployedTestNetworks

// const overrides = {
//   ethereum: { gasLimit: 21_000_000 },
//   polygon: { gasLimit: 3_000_000 },
//   avalanche: { gasLimit: 3_000_000 },
//   klaytn: { gasLimit: 3_000_000 },
// }
const overrides = {
  gasLimit: 5_000_000,
}

const provider = {}
Object.keys(deployedNetworks).forEach((name) => {
  provider[name] = new providers.JsonRpcProvider(deployedNetworks[name].rpc)
})

const allChainNames = Object.keys(deployedNetworks)

// const mnemonic = 'test test test test test test test test test test test junk'
// const wal = Wallet.fromMnemonic(mnemonic)
const wal = new Wallet(process.env.PRIVATE_KEY)

const contract = {
  // ethereum: DotRegistry__factory.connect(deployedNetworks.ethereum.registryAddress, wal.connect(new providers.JsonRpcProvider('http://localhost:8545'))),
  ethereum: new Contract(deployedNetworks.ethereum.registryAddress, DotRegistryAbi, wal.connect(new providers.JsonRpcProvider(deployedNetworks.ethereum.rpc))),
  polygon: new Contract(deployedNetworks.polygon.registryAddress, DotRegistryAbi, wal.connect(new providers.JsonRpcProvider(deployedNetworks.polygon.rpc))),
  avalanche: new Contract(deployedNetworks.avalanche.registryAddress, DotRegistryAbi, wal.connect(new providers.JsonRpcProvider(deployedNetworks.avalanche.rpc))),
  klaytn: new Contract(deployedNetworks.klaytn.registryAddress, DotRegistryAbi, wal.connect(new providers.JsonRpcProvider(deployedNetworks.klaytn.rpc))),
}

/**
 * @param {string} originChain
 * @param {string} vaaBytes
 * @returns {Promise<[string[], string[]]>}
 */
async function propagateToOtherChains(originChain, vaaBytes) {
  const otherContracts = Object.keys(contract)
    .filter((key) => key !== originChain)
    .reduce((cur, key) => Object.assign(cur, { [key]: contract[key] }), {})
  const responses = Object.values(otherContracts).map((otherContract) => otherContract.receiveSetOwner(utils.hexlify(Buffer.from(vaaBytes, 'base64')), overrides))
  const chainNames = allChainNames.filter((name) => name !== originChain)
  let vms = []

  try {
    const txs = await Promise.all(responses)
    console.log(originChain, txs)
    const receipts = await Promise.all(txs.map((tx) => tx.wait()))
    // vms = await Promise.all(receipts.map((receipt) => retrieveDummyVM(receipt)))
    // Chain name should be the chain on the destination contract (because the other chain contracts are publishing message)
    vms = await Promise.all(receipts.map((receipt, idx) => fetchVaa(chainNames[idx], receipt)))
  } catch (err) {
    console.error(`Propagation error from ${originChain} for vaaBytes: \n ${vaaBytes}`)
    console.error(err)
    return [[], []]
  }
  return [vms, chainNames]
}

/**
 * @param {string} originChain
 * @param {string} vaaVM
 * @returns {Promise<void>}
 */
async function asyncRegistration(originChain, vaaVM) {
  const [vms, chainNames] = await propagateToOtherChains(originChain, vaaVM)
  console.log('Flight 0', vaaVM)

  // const propagations = []
  for (let i = 0; i < chainNames.length; i++) {
    const secondaryVM = vms[i]

    // await for each propagation to avoid nonce error (TODO: self nonce management for faster queue-up)
    // eslint-disable-next-line no-await-in-loop
    await propagateToOtherChains(chainNames[i], secondaryVM)
    // propagations.push(propagateToOtherChains(chainNames[i], secondaryVM))
    console.log(`Flight ${i + 1}`, secondaryVM)
  }

  // await Promise.all(propagations)
}

export async function register(options) {
  try {
    const { originChain, txHash } = options

    // wait for tx to be mined to retrieve the receipt
    await provider[originChain].waitForTransaction(txHash)
    const txReceipt = await provider[originChain].getTransactionReceipt(txHash)

    const vaaVM = await fetchVaa(originChain, txReceipt)
    // const dummyVM1 = await retrieveDummyVM(txReceipt)

    await asyncRegistration(originChain, vaaVM)

    return true
  } catch (e) {
    console.log(e)
    if (e instanceof ApiError) throw e
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error')
  }
}
