import axios from 'axios'
import {
  providers, utils, Contract, ContractInterface,
} from 'ethers'

import {
  ChainId, ChainRpc, ExplorerApiKey, ExplorerEndpoint,
} from './constants'
import { ABIFunction, ABIFunctionIO } from '../types/common'

export function getProvider(chainId: ChainId) {
  return new providers.StaticJsonRpcProvider(ChainRpc[chainId], chainId)
}

/**
 * Roughly checks if an address is a contract or not
 * @param address
 * @param chainId
 */
export async function isAddressContract(address: string, chainId: ChainId) {
  const provider = getProvider(chainId)
  console.log(provider)
  try {
    const code = await provider.getCode(address)
    return code !== '0x' // !== '0x' means not empty data ==> is contract
  } catch (error) {
    return false
  }
}

export async function getABI(address: string, chainId: ChainId): Promise<ContractInterface | undefined> {
  const isContract = await isAddressContract(address, chainId)
  console.log(address, isContract)
  if (!isContract) return undefined

  const params = {
    module: 'contract',
    action: 'getabi',
    address,
    apikey: ExplorerApiKey[chainId],
  }
  return axios.get<{
    status: string,
    message?: string,
    result: string,
  }>(ExplorerEndpoint[chainId], { params })
    .then((res) => res.data.result)
    // .then((res) => JSON.parse(res.data.result) as ContractInterface)
    .catch((err) => {
      console.log(err)
      return undefined
    })
}

export async function getABIFunctions(address: string, chainId: ChainId): Promise<ABIFunction[]> {
  if (!utils.isAddress(address)) return []

  const abi = await getABI(address, chainId)
  console.log(address, chainId, abi)
  if (!abi) return []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  return JSON.parse(abi as string).filter((x: { type?: string }) => x.type === 'function')
}

export function isXNameValid(name: string): boolean {
  return name.replace('.worm', '').trim() !== '' && name.endsWith('.worm') && !(/[^a-z0-9]/.test(name.replace(/\.worm$/, '')))
}
