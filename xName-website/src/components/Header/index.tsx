import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'

import { ReactPropChildren } from '../../types/common'
import Container from '../Container'

interface HeaderNavMenuItemProps {
  to: string
  text: string
  active: boolean
}

// type HeaderNavComponent = React.FC<ReactPropChildren> & {
//   Left: React.FC<ReactPropChildren>,
//   Center: React.FC<ReactPropChildren>,
//   Right: React.FC<ReactPropChildren>,
//   Menu: React.FC<ReactPropChildren>,
//   MenuItem: React.FC<HeaderNavMenuItemProps>,
// }

function HeaderNav(props: ReactPropChildren) {
  return <Container>{props.children}</Container>
}

HeaderNav.Left = (props: ReactPropChildren) => (
  <div className="navbar-start">{props.children}</div>
)

HeaderNav.Center = (props: ReactPropChildren) => (
  <div className="navbar-center hidden bg-white border-2 border-white rounded-[20px] lg:flex">{props.children}</div>
)

HeaderNav.Right = (props: ReactPropChildren) => (
  <div className="navbar-end pl-6 text-right flex space-x-4 items-center">{props.children}</div>
)

HeaderNav.Menu = (props: ReactPropChildren) => (
  <div className="flex text-md font-semibold">{props.children}</div>
)

HeaderNav.MenuItem = (props: HeaderNavMenuItemProps) => (
  <Link
    to={props.to}
    className={
      clsx(
        'btn btn-ghost rounded-[20px] overflow-hidden',
        'hover:bg-[#f7f8fa] hover:rounded-[20px] hover:outline-none',
        !props.active ? 'text-gray-500 hover:text-black' : 'bg-[#f7f8fa] text-black',
      )
    }
  >
    {props.text}
  </Link>
)

export default HeaderNav
