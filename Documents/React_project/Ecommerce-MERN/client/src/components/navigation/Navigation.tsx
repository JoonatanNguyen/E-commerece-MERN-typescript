import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import './style.scss'

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { IconButton, Badge } from '@material-ui/core'

import SideBurgerMenu from '../sideMenu /index'
import NavLinks from '../centerNavLinks'
import Logo from '../logo'
import { AppState } from '../../types'
import useHideOnScroll from '../../hooks/useHideOnScroll'

type NavigationType = {
  isBlackLogo: boolean
  iconNavVariant: string
  navlinkVariant: string
  sideMenuVariant: string
  shouldHaveBorder: boolean
}

const NavigationBar = ({
  isBlackLogo,
  iconNavVariant,
  navlinkVariant,
  sideMenuVariant,
  shouldHaveBorder,
}: NavigationType) => {
  const history = useHistory()
  const productCart = useSelector((state: AppState) => state.product.inCart)
  const isHidden = useHideOnScroll()
  const reduxCart = productCart.map(q => q.quantity).reduce((a, b) => a + b, 0)

  function handleUserAccountIconClick() {
    history.push('/account/auth')
  }

  function handleCartIconClick() {
    history.push('/checkout')
  }

  return (
    <div className="navigation-container">
      <div
        className="navigation-container__banner"
        style={{
          backgroundColor: isHidden ? (isBlackLogo ? 'white' : 'black') : '',
        }}
      >
        <SideBurgerMenu sideMenuVariant={sideMenuVariant} />
        <div className="logo-nav-links">
          <Logo isBlackLogo={isBlackLogo} />
        </div>
        <div className="functions-section">
          <IconButton onClick={handleUserAccountIconClick}>
            <AccountCircleOutlinedIcon
              className={`icon-navbar icon-navbar--${iconNavVariant}`}
            />
          </IconButton>
          <IconButton onClick={handleCartIconClick}>
            <Badge badgeContent={reduxCart} color="secondary">
              <ShoppingCartOutlinedIcon
                className={`icon-navbar icon-navbar--${iconNavVariant}`}
              />
            </Badge>
          </IconButton>
        </div>
      </div>
      {isHidden ? null : (
        <NavLinks
          navlinkVariant={navlinkVariant}
          shouldHaveBorder={shouldHaveBorder}
        />
      )}
    </div>
  )
}

export default NavigationBar
