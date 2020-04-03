import React from 'react'

import NavigationBar from '../navigation'

import './styles.scss'
import ShopButton from '../shopButton'

type BackgroundImage = {
  backgroundImage: string
}
const Header = ({ backgroundImage }: BackgroundImage) => {
  return (
    <div
      className="header-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavigationBar
        isBlackLogo={false}
        iconNavVariant="white"
        navlinkVariant="white"
        sideMenuVariant="white"
        shouldHaveBorder={false}
      />
      <div className="header-container__layer">
        <div className="center-container">
          <h3 className="center-container__small-label">BEOSOUND BALANCE</h3>
          <p className="center-container__product-name">
            New wireless home speaker
          </p>
          <ShopButton
            borderVariant="white"
            isBorderButton={true}
            buttonIconVariant="white"
            buttonText="SHOP NOW"
            buttonWidth="200px"
            onButtonClick={() => {}}
            buttonMargin=""
          />
        </div>
      </div>
    </div>
  )
}

export default Header
