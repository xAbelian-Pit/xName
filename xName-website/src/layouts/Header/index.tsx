import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { Link } from 'react-router-dom'

import xNameLogo from '../../assets/xName.svg'

import Container from '../../components/Container'
import HeaderNav from '../../components/Header'
import LogoText from '../../components/Text/Logo'
// import useCurrentPath from '../../hooks/useCurrentPath'

export default function Header() {
  // const currentPath = useCurrentPath()
  return (
    <div className="navbar pt-3">
      <Container>
        <HeaderNav.Left>
          <Link to="/" className="inline-block py-1 px-2">
            <div className="inline-block align-middle">
              <img src={xNameLogo} alt="xName" className="h-full w-full max-h-12" />
            </div>
            <div className="inline-block text-2xl text-gray-800 whitespace-nowrap tracking-tight align-middle">
              <LogoText />
            </div>
          </Link>
        </HeaderNav.Left>
        {
          // <HeaderNav.Center>
          //   <HeaderNav.Menu>
          //     <HeaderNav.MenuItem to="/" text="Home" active={currentPath === '/'} />
          //     <HeaderNav.MenuItem to="/explore" text="Explore" active={currentPath === '/explore'} />
          //     <HeaderNav.MenuItem to="/create" text="Create" active={currentPath === '/create'} />
          //   </HeaderNav.Menu>
          // </HeaderNav.Center>
        }
        <HeaderNav.Right>
          <div>
            <ConnectButton />
          </div>
        </HeaderNav.Right>
      </Container>
    </div>
  )
}
