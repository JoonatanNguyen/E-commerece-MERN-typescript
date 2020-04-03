import React from 'react'

import './style.scss'

type SideBurgerMenuType = {
  sideMenuVariant: string
}

const SideBurgerMenu = ({ sideMenuVariant }: SideBurgerMenuType) => {
  return (
    <div className="side-menu" aria-label="Side menu button">
      <span className={`side-menu__span side-menu__span--${sideMenuVariant}`} />
      <span className={`side-menu__span side-menu__span--${sideMenuVariant}`} />
      <span className={`side-menu__span side-menu__span--${sideMenuVariant}`} />
    </div>
  )
}

export default SideBurgerMenu
