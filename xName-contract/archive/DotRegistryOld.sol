// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import { ReentrancyGuard } from '@openzeppelin/contracts/security/ReentrancyGuard.sol';

import { BridgeStructs } from './interfaces/Wormhole/BridgeStructs.sol';
import { IWormhole } from './interfaces/Wormhole/IWormhole.sol';
import { BytesLib } from './libs/BytesLib.sol';
import { RegistryStructs } from './structs/RegistryStructs.sol';

contract DotRegistry {
    using BytesLib for bytes;

    address private immutable CORE_BRIDGE_ADDRESS;

    // Finalized owner address to domain name
    mapping(address => string[]) private ownersByAddress;

    // Finalized domain name to owner address
    mapping(string => address) private ownersByName;

    // Pending domain registration
    mapping(string => address) private pendingOwnersByName;

    // For pending domain, list of IDs from which the contract received firstRound VAAs
    mapping(string => uint16[]) private pendingChainIds;

    // Pending domain registration deadline
    mapping(string => address) private pendingDeadline;

    // Supported chain IDs
    uint16[] private supportedChainIds = [1, 2, 3, 4, 5];

    uint32 private nonce = 0;

    constructor(address _coreBridgedAddress) {
        CORE_BRIDGE_ADDRESS = _coreBridgedAddress;
    }

    function wormhole() public view returns (IWormhole) {
        return IWormhole(CORE_BRIDGE_ADDRESS);
    }

    // @dev No fee for registration in MVP.
    function register(string memory _name) public returns (uint64 sequence) {
        require(ownersByName[_name] == address(0), 'Name already registered');
        require(pendingOwnersByName[_name] == address(0), 'Name pending registration');

        pendingOwnersByName[_name] = msg.sender;

        sequence = _register(addressToBytes32(msg.sender), _name, 0); // 0 for pending
    }

    function _register(
        bytes32 _owner,
        string memory _name,
        uint8 status
    ) internal returns (uint64 sequence) {
        RegistryStructs.Registration memory registration = RegistryStructs.Registration({
            payloadID: 9,
            name: _name,
            owner: _owner,
            fromChain: wormhole().chainId(),
            srcChain: wormhole().chainId(),
            status: status
        });

        sequence = wormhole().publishMessage(nonce, encodeRegistration(registration), 1);
    }

    function foreignRegistrationInquiry(bytes calldata encodedVM) public returns (uint64 sequence) {
        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole().parseAndVerifyVM(encodedVM);

        require(valid, reason);
        require(verifyBridgeVM(vm), 'Invalid emitter');

        RegistryStructs.Registration memory registration = _decodeVaaPayload(vm.payload);

        require(registration.status == 0, 'Invalid registration status received');

        RegistryStructs.Registration memory response = RegistryStructs.Registration({
            payloadID: registration.payloadID,
            name: registration.name,
            owner: registration.owner,
            fromChain: wormhole().chainId(),
            srcChain: registration.srcChain,
            status: 1
        });

        if (ownersByName[response.name] != address(0)) {
            if (addressToBytes32(ownersByName[response.name]) != response.owner) {
                response.status = 2;
            } else {
                response.status = 3;
            }
        } else if (pendingOwnersByName[response.name] != address(0)) {
            // TODO: If pending by another user on different chain, do first-come first-serve.
            if (addressToBytes32(pendingOwnersByName[response.name]) != response.owner) {
                response.status = 4;
            } else {
                response.status = 5;
            }
        } else {
            pendingOwnersByName[response.name] = bytes32ToAddress(response.owner);
        }

        sequence = wormhole().publishMessage(nonce, encodeRegistration(registration), 1);
    }

    /// @dev Attest to registration inquiry from foreign chain
    function _attest() private {
        
    }

    function secondRoundRegistration(bytes calldata encodedVm) public returns (uint64 sequence) {
        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole().parseAndVerifyVM(encodedVm);

        require(valid, reason);
        require(verifyBridgeVM(vm), 'Invalid emitter');

        RegistryStructs.Registration memory registration = _decodeVaaPayload(vm.payload);

        bool addVaa = true;
        for (uint16 i = 0; i < pendingChainIds[registration.name].length; i++) {
            if (pendingChainIds[registration.name][i] == registration.fromChain) {
                addVaa = false;
                break;
            }
        }

        if (addVaa) {
            pendingChainIds[registration.name].push(registration.fromChain);
        }

        require(pendingChainIds[registration.name].length == supportedChainIds.length - 1, 'All VAAs need to be received');
    }

    function _decodeVaaPayload(bytes memory payload) private pure returns (RegistryStructs.Registration memory) {
        RegistryStructs.Registration memory decoded = RegistryStructs.Registration({
            payloadID: payload.slice(0,1).toUint8(0),
            // this conversion from bytes32 to string preserves zero padding (might be a problem?)
            name: string(abi.encodePacked(payload.slice(1,32).toBytes32(0))),
            owner: payload.slice(33,32).toBytes32(0),
            fromChain: payload.slice(65,2).toUint16(0),
            srcChain: payload.slice(67,2).toUint16(0),
            status: payload.slice(69,1).toUint8(0)
        });
        return decoded;
    }

    function encodeRegistration(RegistryStructs.Registration memory registration) public pure returns (bytes memory encoded) {
        encoded = abi.encodePacked(
            registration.payloadID,
            registration.name,
            registration.owner,
            registration.fromChain,
            registration.srcChain,
            registration.status
        );
    }

    function bytes32ToAddress(bytes32 bys) private pure returns (address) {
        return address(uint160(uint256(bys)));
    }

    function addressToBytes32(address addr) private pure returns (bytes32) {
        return bytes32(uint256(uint160(addr)) << 96);
    }

    function verifyBridgeVM(IWormhole.VM memory vm) internal view returns (bool){
        require(!isFork(), 'Invalid fork');
        // don't check for receiving chain ID
        // return bridgeContracts(vm.emitterChainId) == vm.emitterAddress;
        return true;
    }

    function isFork() public view returns (bool) {
        return wormhole().evmChainId() != block.chainid;
    }

    function bridgeContracts(uint16 chainId_) public view returns (bytes32){
        return wormhole()._state.bridgeImplementations[chainId_];
    }
}
