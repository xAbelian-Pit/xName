import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import { ethers } from 'hardhat'

import type { MockDotRegistry, MockDotRegistry__factory } from '../../types'

export async function deployRegistryFixture(): Promise<{ registry: MockDotRegistry }> {
  const signers: SignerWithAddress[] = await ethers.getSigners()
  const admin: SignerWithAddress = signers[0]

  // const args: any[] = [
  //   constants.AddressZero,
  // ]
  const registryFactory = await ethers.getContractFactory('MockDotRegistry') as MockDotRegistry__factory
  const registry: MockDotRegistry = await registryFactory.connect(admin).deploy()
  await registry.deployed()

  return { registry }
}
