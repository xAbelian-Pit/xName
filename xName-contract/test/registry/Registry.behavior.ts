import { expect } from 'chai'
import { constants } from 'ethers'

export function shouldBehaveLikeRegistry(): void {
  // it("should return the new greeting once it's changed", async function () {
  //   expect(await this.greeter.connect(this.signers.admin).greet()).to.equal("Hello, world!")

  //   await this.greeter.setGreeting("Bonjour, le monde!")
  //   expect(await this.greeter.connect(this.signers.admin).greet()).to.equal("Bonjour, le monde!")
  // })

  it('should mark registry of unregistered node as pending', async function () {
    const registry = this.registry.connect(this.signers.admin)
    const addr = this.signers.admin.address

    await registry.setOwner(this.node, addr)
    expect(await registry.pendingOwner(this.node)).to.equal(addr)
  })

  it('should not modify the owner state of pending node registration', async function () {
    const registry = this.registry.connect(this.signers.admin)
    const addr = this.signers.admin.address

    await registry.setOwner(this.node, addr)
    // @ts-ignore
    expect(await registry['owner(bytes32)'](this.node)).to.equal(constants.AddressZero)
  })

  // it('should emit a VAA upon new registration', async function () {
  //   const registry = await this.registry.connect(this.signers.admin)
  //   const wormhole = await this.wormhole.connect(this.signers.admin)
  //   const addr = await this.signers.admin.getAddress()

  //   await expect(await registry.setOwner(this.node, addr))
  //     .to.emit(wormhole, 'MockVMLog')
  // })

  // it('should parse VM', async function () {
  //   const wormhole = await this.wormhole.connect(this.signers.admin)

  //   const dummyVM = await wormhole.createDummyVM(2, constants.AddressZero)

  //   const parsedVM = await wormhole.parseVM(dummyVM)
  //   console.log(parsedVM)
  // })

  it('should add chain ID', async function () {
    const registry = this.registry.connect(this.signers.admin)

    await registry.addSupportedChainId(5)
    expect(await registry.getChainIds()).deep.equal([2, 5]) // use deep equal to match content
  })
}
