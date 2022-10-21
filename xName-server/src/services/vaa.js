import {
  getEmitterAddressEth,
  parseSequenceFromLogEth,
} from '@certusone/wormhole-sdk'
import axios from 'axios'
import { providers, utils, Wallet } from 'ethers'

import { deployedMockNetworks, deployedTestNetworks } from './networks'

const type = 'testnet' // 'mainnet'
const wormholeRestAddress = `https://wormhole-v2-${type}-api.certus.one`

const deployedNetworks = deployedTestNetworks

/**
 * @param {string} url
 * @param {number} attempt
 * @param {number} maxAttempts
 * @param {number} attemptInterval
 * @returns {Promise<{vaaBytes: string}|*>}
 */
async function fetchVaaAttempt(
  url,
  attempt,
  maxAttempts,
  attemptInterval,
) {
  if (attempt > maxAttempts) throw new Error('VAA not found!')
  // the waiting part
  await new Promise((r) => {
    setTimeout(r, attemptInterval)
  })
  try {
    const { data } = await axios.get(url) // FetchVaa
    if (data.code === 5 || data.message === 'requested VAA not found in store') throw new Error('VAA not found')
    return data // { vaaBytes: string }
  } catch (err) {
    console.log(`VAA attempt failed (${attempt}/${maxAttempts})`)
    attempt += 1
    return fetchVaaAttempt(url, attempt, maxAttempts, 2 * attemptInterval)
  }
}

/**
 * @param {string} originChain
 * @param {providers.TransactionReceipt} receipt
 * @returns {Promise<string>}
 */
export async function fetchVaa(originChain, receipt) {
  const { bridgeAddress, registryAddress, wormholeChainId } = deployedNetworks[originChain]
  // console.log(bridgeAddress, registryAddress, wormholeChainId)
  console.log(originChain, wormholeChainId, receipt.transactionHash)
  console.log('bridge address', bridgeAddress, receipt.logs)
  const seq = parseSequenceFromLogEth(receipt, bridgeAddress)
  const emitterAddr = getEmitterAddressEth(registryAddress) // registry contract is publishing message!
  // console.log(seq, emitterAddr)

  console.log(
    'Searching for: ',
    `${wormholeRestAddress}/v1/signed_vaa/${wormholeChainId}/${emitterAddr}/${seq}`
  )

  await new Promise((r) => { setTimeout(r, 2000) }) // wait for Guardian to pick up message

  const vaaPickUpUrl = `${wormholeRestAddress}/v1/signed_vaa/${wormholeChainId}/${emitterAddr}/${seq}`
  const maxAttempts = 10
  const attemptInterval = 2500 // 2.5s

  const { vaaBytes } = await fetchVaaAttempt(vaaPickUpUrl, 0, maxAttempts, attemptInterval)
  // const vaaHex = utils.hexlify(Buffer.from(vaaBytes, 'base64'))
  console.log(
    `VAA found for: ${wormholeRestAddress}/v1/signed_vaa/${wormholeChainId}/${emitterAddr}/${seq}`,
    // vaaBytes
  )
  // console.log(vaaHex)
  return vaaBytes
}

/**
 * @param {providers.TransactionReceipt} receipt
 * @returns {Promise<string>}
 */
export async function retrieveDummyVM(receipt) {
  const iface = new utils.Interface(['event MockVMLog(bytes vm)'])
  let dummyVM = ''
  receipt.logs.forEach((log) => {
    try {
      // eslint-disable-next-line prefer-destructuring
      dummyVM = iface.parseLog(log).args[0]
    } catch (err) {
      console.error(err)
    }
  })
  return dummyVM
}
