// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

import { DotRegistry } from '../DotRegistry.sol';
import { MockWormhole } from './MockWormhole.sol';
import { IWormhole } from '../interfaces/Wormhole/IWormhole.sol';

contract MockDotRegistry is DotRegistry {
    MockWormhole _wormhole;

    constructor(uint16 _chainId) DotRegistry(address(0)) {
        console.log('Initialized MockDotRegistry');
        _wormhole = new MockWormhole(_chainId);
    }

    function wormhole() public view override returns (IWormhole) {
        return _wormhole;
    }
}
