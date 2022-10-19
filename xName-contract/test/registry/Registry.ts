import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import { utils } from 'ethers'
import { ethers } from 'hardhat'

import type { Signers } from '../types'
import { shouldBehaveLikeRegistry } from './Registry.behavior'
import { deployRegistryFixture } from './Registry.fixture'
import { deployWormholeFixture } from './Wormhole.fixture'

describe('Unit tests', function () {
  before(async function () {
    this.signers = {} as Signers

    const signers: SignerWithAddress[] = await ethers.getSigners()
    this.signers.admin = signers[0]

    this.loadFixture = loadFixture

    this.node = utils.namehash('jongwon.worm')

    const { wormhole } = await this.loadFixture(deployWormholeFixture)
    this.wormhole = wormhole
  })

  describe('Registry', function () {
    beforeEach(async function () {
      const { registry } = await this.loadFixture(deployRegistryFixture)
      this.registry = registry
    })

    shouldBehaveLikeRegistry()
  })
})
