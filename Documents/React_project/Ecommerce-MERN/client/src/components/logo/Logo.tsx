import React from 'react'
import { useHistory } from 'react-router'

import './styles.scss'

type LogoType = {
  isBlackLogo: boolean
}

const Logo = ({ isBlackLogo }: LogoType) => {
  const history = useHistory()
  function handleLogoClick() {
    history.push('/')
  }

  return (
    <div className="logo" onClick={handleLogoClick}>
      <img
        src={
          isBlackLogo
            ? 'https://images.ctfassets.net/8cd2csgvqd3m/2DofHpDpfn7m3GJlTywHm4/884baadc03f6dcbd3ff51b1f10717fcd/primary-logo-black.svg'
            : 'https://images.ctfassets.net/8cd2csgvqd3m/4JdKzu629zMIigR4O0AUGW/60ca2254d3cf4ed943ead8a12b947f8f/primary-logo-white.svg'
        }
        alt="logo"
      />
    </div>
  )
}

export default Logo
