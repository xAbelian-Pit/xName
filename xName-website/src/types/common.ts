import React from 'react'

export type ReactChildren = React.ReactNode | React.ReactNode[]

export interface ReactPropChildren {
  children: ReactChildren
}

export type SvgElement = HTMLElement & SVGElement

export interface ABIFunctionIO { // input & output
  internalType: string
  name: string
  type: string
}

export interface ABIFunction {
  inputs: ABIFunctionIO[]
  name: string
  outputs: ABIFunctionIO[]
  stateMutability: string // 'payable' | 'view'
  type: 'function'
}
