// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
//import 'hardhat/console.sol';

import { Dot } from './interfaces/Dot.sol';
import { IWormhole } from './interfaces/Wormhole/IWormhole.sol';
import { BytesLib } from './libs/BytesLib.sol';
import { RegistryStructs } from './structs/RegistryStructs.sol';

/**
 * The ENS registry contract.
 */
contract DotRegistry is Dot, Ownable {
    using BytesLib for bytes;

    struct Record {
        address owner;
        address resolver;
        uint64 ttl;
    }

    address private immutable CORE_BRIDGE_ADDRESS;

    mapping(bytes32 => Record) public records;

    // mapping(address => mapping(address => bool)) public operators;

    /// @dev Pending records registration owner address
    mapping(bytes32 => address) public pending;

    /// @dev Pending resolve status for registration
    mapping(bytes32 => mapping(uint16 => bool)) public pendingResolved;

    // Supported Wormhole chain IDs
    // NOTE: Only EVMs for now... I need to learn Anchor...
    // uint16[] private chainIds = [2, 5, 6];
    uint16[] public chainIds = [2, 5, 6, 13];

    /// @dev Contract address (Wormhole-format) of deployed DotRegistry on other chains
    mapping(bytes32 => bool) public registryDelegates;

    uint32 private nonce = 0;

    // Permits modifications only by the owner of the specified node.
    // Or by anyone if unregistered.
    modifier authorized(bytes32 node) {
        address owner = records[node].owner;
        if (owner != address(0)) {
            require(owner == msg.sender, 'Unauthorized to set record for the node'); // || operators[owner][msg.sender]
        }
        _;
    }

    modifier notPending(bytes32 node) {
        require(pending[node] == address(0), 'Registration is pending');
        _;
    }

    constructor(address _coreBridgedAddress) {
        records[0x0].owner = msg.sender;
        CORE_BRIDGE_ADDRESS = _coreBridgedAddress;
//        chainIds.push(IWormhole(CORE_BRIDGE_ADDRESS).chainId());
    }

    function setRegistryDelegate(address[] memory delegates, bool[] memory permitted) external onlyOwner {
        require(delegates.length == permitted.length, 'Length mismatch');
        for (uint i = 0; i < delegates.length;) {
            require(delegates[i] != address(0));
            registryDelegates[addressToBytes32(delegates[i])] = permitted[i];
            unchecked {
                i++;
            }
        }
    }

    function addSupportedChainId(uint16 chainId) external onlyOwner {
        for (uint i = 0; i < chainIds.length;) {
            if (chainIds[i] == chainId) return;
            unchecked {
                i++;
            }
        }
        chainIds.push(chainId);
    }

    function removeSupportedChainId(uint16 chainId) external onlyOwner {
        for (uint i = 0; i < chainIds.length;) {
            if (chainIds[i] == chainId) {
                chainIds[i] = chainIds[chainIds.length - 1];
                chainIds.pop();
                return;
            }
            unchecked {
                i++;
            }
        }
    }

    function setRecord(
        bytes32 node,
        address owner,
        address resolver,
        uint64 ttl
    ) external virtual override {
        setOwner(node, owner);
        // _setResolverAndTTL(node, resolver, ttl);
    }

    /**
     * @dev Transfers ownership of a node to a new address.
     * @dev If registered, may only be called by the current owner of the node.
     * @dev Otherwise, may be called by anyone.
     * @param node The node to transfer ownership of.
     * @param owner The address of the new owner, Wormhole compatible format.
     */
    function setOwner(bytes32 node, address owner)
        public
        virtual
        override
        authorized(node)
        notPending(node)
        returns (uint64 sequence)
    {
        sequence = _setOwner(node, owner);
        emit Transfer(node, owner);
    }

    function revertSetOwner(bytes32 node) public onlyOwner {
        pending[node] = address(0);
        resetPending(node);
    }

    // function setResolver(bytes32 node, address resolver) public virtual override authorized(node) {
    //     emit NewResolver(node, resolver);
    //     records[node].resolver = resolver;
    // }

    // function setTTL(bytes32 node, uint64 ttl) public virtual override authorized(node) {
    //     emit NewTTL(node, ttl);
    //     records[node].ttl = ttl;
    // }

    // /**
    //  * @dev Enable or disable approval for a third party ("operator") to manage
    //  *  all of `msg.sender`'s ENS records. Emits the ApprovalForAll event.
    //  * @param operator Address to add to the set of authorized operators.
    //  * @param approved True if the operator is approved, false to revoke approval.
    //  */
    // function setApprovalForAll(address operator, bool approved) external virtual override {
    //     operators[msg.sender][operator] = approved;
    //     emit ApprovalForAll(msg.sender, operator, approved);
    // }

    function owner(bytes32 node) public view virtual override returns (address) {
        address addr = records[node].owner;
        if (addr == address(this)) {
            return address(0x0);
        }
        return addr;
    }

    function pendingOwner(bytes32 node) public view virtual override returns (address) {
        address addr = pending[node];
        if (addr == address(this)) {
            return address(0x0);
        }
        return addr;
    }


    function resolver(bytes32 node) public view virtual override returns (address) {
        return records[node].resolver;
    }


    function ttl(bytes32 node) public view virtual override returns (uint64) {
        return records[node].ttl;
    }

    function recordExists(bytes32 node) public view virtual override returns (bool) {
        return records[node].owner != address(0x0);
    }

    function getChainIds() public view returns (uint16[] memory) {
        return chainIds;
    }

    // /**
    //  * @dev Query if an address is an authorized operator for another address.
    //  * @param owner The address that owns the records.
    //  * @param operator The address that acts on behalf of the owner.
    //  * @return True if `operator` is an approved operator for `owner`, false otherwise.
    //  */
    // function isApprovedForAll(address owner, address operator) external view virtual override returns (bool) {
    //     return operators[owner][operator];
    // }

    function isPendingResolvedForAll(bytes32 node) internal view returns (bool) {
        for (uint i = 0; i < chainIds.length;) {
            // don't return false if it's checking self chain ID
            if (chainIds[i] != wormhole().chainId() && !pendingResolved[node][chainIds[i]]) return false;
            unchecked {
                i++;
            }
        }
        return true;
    }

    function resetPending(bytes32 node) internal {
        pending[node] = address(0);
        for (uint i = 0; i < chainIds.length;) {
            pendingResolved[node][chainIds[i]] = false;
            unchecked {
                i++;
            }
        }
    }

    function _setOwner(bytes32 node, address owner) internal virtual returns (uint64 sequence) {
        pending[node] = owner;
        pendingResolved[node][wormhole().chainId()] = true;

        RegistryStructs.Registration memory registration = RegistryStructs.Registration({
            payloadID: 9,
            node: node,
            owner: addressToBytes32(owner),
            resolver: addressToBytes32(address(0)), // not modifying resolver, indicated by address(0)
            ttl: 0, // not modifying ttl, indicated by 0
            srcChain: wormhole().chainId(),
            status: 1 // verified on this chain
        });
        // console.log('Owner: ', owner);
        // console.log('Node: ');
        // console.logBytes32(node);
        // console.log('Wormhole ChainID: ', wormhole().chainId());

        // two Benjamins for instant finality in testnet
        sequence = wormhole().publishMessage(nonce, encodeRegistration(registration), 200);
        nonce++;
        // console.log('Sequence: ', sequence);
    }

    function receiveSetOwner(bytes calldata encodedVM) external returns (uint64 sequence) {
        // `parseAndVerifyVM` referenced at https://github.com/wormhole-foundation/wormhole/blob/dev.v2/ethereum/contracts/Messages.sol#L16
        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole().parseAndVerifyVM(encodedVM);
        // console.log(valid, reason);

        require(valid, reason);

        // NOTE: Reject VAA from own contract (this chain)
        require(registryDelegates[vm.emitterAddress], 'Unregistered delegate registry emitter address');

        RegistryStructs.Registration memory reg = _decodeVaaPayload(vm.payload);
        // console.log('>> Registration <<');
        // console.log('Status: ', reg.status);
        // console.log('Owner: ');
        // console.logBytes32(reg.owner);
        // console.log('Node: ');
        // console.logBytes32(reg.node);
        // console.log('TTL: ', reg.ttl);
        // console.log('Resolver: ');
        // console.logBytes32(reg.resolver);
        // console.log('SrcChain: ', reg.srcChain);

        if (reg.status == 1) {
            // receiving VM message from another chain that verifies there's no conflict on its chain
            pendingResolved[reg.node][vm.emitterChainId] = true;
        }

        if (isPendingResolvedForAll(reg.node)) {
            // All chains have verified that there's no conflict on their chain
            // Finalize the state
            resetPending(reg.node);
            records[reg.node].owner = bytes32ToAddress(reg.owner);
            records[reg.node].resolver = bytes32ToAddress(reg.resolver);
            records[reg.node].ttl = uint64(reg.ttl);
        } else if (!pendingResolved[reg.node][wormhole().chainId()]) {
            //
            RegistryStructs.Registration memory res = RegistryStructs.Registration({
                payloadID: 9,
                node: reg.node,
                owner: reg.owner,
                resolver: reg.resolver,
                ttl: reg.ttl,
                srcChain: reg.srcChain,
                status: 1
            });

            address prevOwner = owner(reg.node);
            if (prevOwner != address(0)) {
                // If prevOwner == currentOwner, then already registered on this chain by the SAME owner (3)
                // Otherwise, already registered on this chain by a DIFFERENT owner (2)
                if (addressToBytes32(prevOwner) == reg.owner) res.status = 3;
                else res.status = 2;
            } else if (pending[reg.node] != address(0)) {
                // TODO: If pending by another user on different chain, do first-come first-serve.

                // If node is already pending registration on this chain by the SAME owner (5)
                // ""                                                    by a DIFFERENT owner (4)
                if (addressToBytes32(pending[reg.node]) == reg.owner) res.status = 5;
                else res.status = 4;
            } else {
                // No conflict, set as pending & add this chain ID as resolved for pending.
                pending[reg.node] = bytes32ToAddress(reg.owner);
                pendingResolved[reg.node][wormhole().chainId()] = true;
            }

            // two-hunnet for instant finality in testnet
            sequence = wormhole().publishMessage(nonce, encodeRegistration(res), 200);
            nonce++;
        }
    }

    // function _setResolverAndTTL(
    //     bytes32 node,
    //     address resolver,
    //     uint64 ttl
    // ) internal {
    //     if (resolver != records[node].resolver) {
    //         records[node].resolver = resolver;
    //         emit NewResolver(node, resolver);
    //     }

    //     if (ttl != records[node].ttl) {
    //         records[node].ttl = ttl;
    //         emit NewTTL(node, ttl);
    //     }
    // }

    function wormhole() public virtual view returns (IWormhole) {
        return IWormhole(CORE_BRIDGE_ADDRESS);
    }

    function _decodeVaaPayload(bytes memory payload) private view returns (RegistryStructs.Registration memory) {
//        console.logBytes(payload);
//        console.log('Payload ID');
//        console.log(payload.slice(0,1).toUint8(0));
//        console.log('Node');
//        console.logBytes32(payload.slice(1,32).toBytes32(0));
//        console.log('Owner');
//        console.logBytes32(payload.slice(33,32).toBytes32(0));
//        console.log('Resolver');
//        console.logBytes32(payload.slice(65,32).toBytes32(0));
//        console.log('TTL');
//        console.log(payload.slice(97,8).toUint64(0));
//        console.log('Src Chain');
//        console.log(payload.slice(105,2).toUint16(0));
//        console.log('Status');
//        console.log(payload.slice(107,1).toUint8(0));
        RegistryStructs.Registration memory decoded = RegistryStructs.Registration({
            payloadID: payload.slice(0,1).toUint8(0),
            node: payload.slice(1,32).toBytes32(0),
            owner: payload.slice(33,32).toBytes32(0),
            resolver: payload.slice(65,32).toBytes32(0),
            ttl: payload.slice(97,8).toUint64(0),
            srcChain: payload.slice(105,2).toUint16(0),
            status: payload.slice(107,1).toUint8(0)
        });
        return decoded;
    }

    function encodeRegistration(RegistryStructs.Registration memory reg) public pure returns (bytes memory encoded) {
        encoded = abi.encodePacked(
            reg.payloadID,
            reg.node,
            reg.owner,
            reg.resolver,
            reg.ttl,
            reg.srcChain,
            reg.status
        );
    }

    function bytes32ToAddress(bytes32 bys) private pure returns (address) {
        return address(uint160(uint256(bys)));
    }

    function addressToBytes32(address addr) private pure returns (bytes32) {
        return bytes32(uint256(uint160(addr))); // address is 20 bytes, so pad left 12 bytes (== ethers.utils.hexZeroPad(addr, 32))
    }
}
