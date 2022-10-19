// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RegistryStructs {
    struct Registration {
        // PayloadID uint8 = 9 (just some arbitrary I picked)
        uint8 payloadID;

        // namehash(DOMAIN_NAME_WITH_TLD). Per https://eips.ethereum.org/EIPS/eip-137#namehash-algorithm
        bytes32 node;

        // Address of the owner, Wormhole compatible. Left-zero-padded if shorter than 32 bytes
        bytes32 owner;

        // Address of the resolver, Wormhole compatible. Left-zero-padded if shorter than 32 bytes
        bytes32 resolver;

        // Time-To-Live of node.
        uint64 ttl;

        // Chain ID of the sending registry
        // uint16 fromChain;
        // NOTE: Retrieve this from `vm.emitterChainId`

        // Chain ID of the originating registry (where original registration was created)
        uint16 srcChain;

        // Domain registration status
        // 0: Pending
        // 1: Verified --- successfully verified foreign request
        // 2: Already Registered --- already registered on another chain by DIFFERENT owner
        // 3: Resolution --- already registered on another chain by SAME owner
        // 4: Pending Prior --- already in pending state by DIFFERENT owner
        // 5: Pending Prior Resolution --- already in pending state by SAME owner
        // 6: Failed --- catch-all
        uint8 status;
    }
}
