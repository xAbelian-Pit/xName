import httpStatus from 'http-status'
import { providers, utils } from 'ethers'

import { ApiError } from '../utils'

export async function register(options) {
  try {
    const { user: { email, signer }, description, name } = options

    const contract = connectContractWithSigner(signer, MUMBAI_SKILLS_ADDRESS, MUMBAI_SKILLS_ABI)

    const nonce = await signer.getTransactionCount()
    const curGasPrice = await signer.getGasPrice()
    console.log({
      nonce, curGasPrice: curGasPrice.toString(),
    })

    // pre-check if wallet's address has right privilege
    // << this makes API wait for next block (assuming enough gas), which is BAD
    // << thus, just make the contract handle the isCredentialer
    // const txPreCheck = await contract.isCredentialer(fromAddress)

    // TODO: Implement pre-check mechanism that uses local DB synced to public data
    // Since calling createCredential (might) exhaust gas fee even if it fails/reverts,
    // malicious user can keep calling the function. To prevent that, set a local DB entry
    // set syncs to credentials list of the contract (listen to block height) and do a
    // quick check against that data (e.g. array.includes(credentialer))

    // const lastTokenId = await contract.tokenId()
    // console.log(lastTokenId.toString())

    // NOTE: Must define gasPrice and gasLimit to mitigate
    // error `cannot estimate gas; transaction may fail or may require manual gas limit`
    // refer to https://ethereum.stackexchange.com/questions/99242/ethers-gaslimit-gasprice

    // NOTE: Set gas price to current gas price * 1.05 (for faster process)
    // NOTE: We must set nonce manually to prevent transaction getting stuck (look into using NonceManager)
    const config = {
      // gasPrice: curGasPrice.mul(1.05).toString(), // sometimes throws numerical underflow?
      gasPrice: curGasPrice,
      gasLimit: 100000, // 21000 should suffice, but just in case
      nonce,
    }
    const txReceipt = await contract.createCredential(config)
    const { hash: txHash } = txReceipt
    // console.log(txReceipt)

    // Add to database
    await Skills.create({
      name,
      description,
      submitter: email,
      tx_hash: txHash,
      status: 'pending',
    })

    return txReceipt.hash
  } catch (e) {
    console.log(e)
    if (e instanceof ApiError) throw e
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error')
  }
}
