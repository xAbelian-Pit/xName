import axios from 'axios'
import { constants, utils } from 'ethers'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { FiFeather } from 'react-icons/fi'
import { MdLocationSearching } from 'react-icons/md'
import { useNetwork, useContract, useSigner } from 'wagmi'

import DotRegistryAbi from '../../abis/DotRegistry.json'
import Container from '../../components/Container'
import { DotRegistry } from '../../typechain'
import { isXNameValid } from '../../utils/web3'
import { registryContractAddress } from '../../utils/contracts'

export default function HomePageMain() {
  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [inputOwnerValue, setInputOwnerValue] = useState<string>('')
  const [isOwnerSet, setIsOwnerSet] = useState<boolean>(false)
  const [nodeOwner, setNodeOwner] = useState<string>('')

  // Hooks: wagmi
  const { chain } = useNetwork()
  const { data: signer, isError: isErrorSigner, isLoading: isLoadingSigner } = useSigner()
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const registry = useContract({
    address: chain ? registryContractAddress[chain.id] : '',
    abi: DotRegistryAbi,
    signerOrProvider: signer,
  }) as DotRegistry | null

  // Hook: Get Owner
  useEffect(() => {
    if (!registry) return
    if (!isXNameValid(inputNameValue)) {
      if (nodeOwner !== '') setNodeOwner('')
      return
    }

    const node = utils.namehash(inputNameValue)
    // console.log(inputValue, node)
    registry['owner(bytes32)'](node)
      .then((owner) => setNodeOwner(owner))
      .catch((err) => console.error(err))
  }, [inputNameValue, registry]) // no `nodeOwner` as dependency

  // Hook: Set Owner
  useEffect(() => {
    if (!registry || !isXNameValid(inputNameValue) || !utils.isAddress(inputOwnerValue)) return
    const setOwner = () => {
      const node = utils.namehash(inputNameValue)
      registry.setOwner(node, inputOwnerValue)
        .then(async (tx) => {
          await axios.post('http://localhost:8080/register', { txHash: tx.hash })
          return tx.wait()
        })
        .then(() => setIsOwnerSet(true))
    }
    setOwner()
  }, [inputNameValue, inputOwnerValue, registry])

  // Hook: Set Default Register/Transfer Owner Address based on Signer
  useEffect(() => {
    if (signer) signer.getAddress().then(setInputOwnerValue)
  }, [signer])

  return (
    <Container>
      <section className="flex justify-center">
        <div className="max-w-sm flex flex-col space-y-1">
          <div className="text-xName-purple font-semibold">Search Name</div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputNameValue}
              placeholder="jump.worm"
              onChange={(e) => setInputNameValue(e.target.value.toLowerCase())}
              className="input input-md w-72 bg-xName-purple-comp text-lg text-xName-grey font-semibold"
            />
            <button
              type="button"
              // onClick={() => setInputValue('')}
              className={clsx(
                'btn btn-md border-xName-purple-comp bg-xName-purple-comp text-xName-grey',
                'hover:border-xName-purple-comp hover:bg-[#141121] transition-all',
                'hover:outline outline-2 outline-xName-purple-outline outline-offset-2',
              )}
            >
              <MdLocationSearching size="24" />
            </button>
          </div>
        </div>
      </section>
      <section className="flex justify-center pt-8">
        <div className="w-full max-w-lg bg-xName-purple-comp rounded outline outline-2 outline-xName-purple-outline outline-offset-2">
          <div className="py-6 px-10">
            <div className="text-xl text-xName-blue font-semibold">Owner</div>
            <div className="pt-1 text-xName-purple">
              {nodeOwner.length ? nodeOwner !== constants.AddressZero ? nodeOwner : 'No owner... Claim it now!' : '(enter a valid xName)'}
            </div>
          </div>
        </div>
        {
          // <div className="w-full max-w-lg border border-xName-purple-dark rounded">
          //   <div className="py-6 px-10">
          //     <h2 className="text-xl font-semibold">
          //       <span>Register for&nbsp;</span>
          //       <span className="text-xName-grey font-bold">{inputValue}</span>
          //     </h2>
          //   </div>
          //   <div className="flex flex-col space-y-2 py-4">
          //     <div>
          //       <span>Owner: &nbsp;</span>
          //       <span className="text-xName-purple">{nodeOwner}</span>
          //     </div>
          //   </div>
          // </div>
        }
      </section>
      <section className="flex justify-center pt-6">
        <div className="w-full max-w-lg bg-xName-purple-comp rounded outline outline-2 outline-xName-purple-outline outline-offset-2">
          <div className="py-6 px-10">
            <div className="text-xl text-xName-blue font-semibold">Register / Transfer</div>
            <div className="pt-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={inputOwnerValue}
                  placeholder="Enter valid address"
                  onChange={(e) => setInputOwnerValue(e.target.value)}
                  className="input input-md w-full max-w-sm bg-xName-bg text-xName-grey font-semibold"
                />
                <button
                  type="button"
                  // onClick={() => setInputValue('')}
                  className={clsx(
                    'w-40 btn btn-md border-xName-purple-comp bg-xName-bg text-xName-grey',
                    'hover:border-xName-purple-comp hover:bg-xName-bg hover:text-xName-purple transition-all',
                    'hover:outline outline-2 outline-xName-purple-outline outline-offset-2',
                  )}
                >
                  <FiFeather size="24" />
                  <span className="ml-2">{nodeOwner.length && nodeOwner !== constants.AddressZero ? 'Transfer' : 'Register'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
