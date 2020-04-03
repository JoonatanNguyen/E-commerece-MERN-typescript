import React from 'react'
import { useHistory } from 'react-router-dom'

import './styles.scss'

type NavLinkType = {
  navlinkVariant: string
  shouldHaveBorder: boolean
}

const NavLinks = ({ navlinkVariant, shouldHaveBorder }: NavLinkType) => {
  let history = useHistory()
  function handleSpeakerClick() {
    history.push('/products/speakers')
  }
  function handleHeadphoneClick() {
    history.push('/products/headphones')
  }
  function handleTelevisionClick() {
    history.push('/products/televisions')
  }

  return (
    <div
      className="nav-link-container"
      style={{ border: shouldHaveBorder ? '1px solid rgb(241, 241, 241)' : '' }}
    >
      <ul className="nav-link">
        <li
          onClick={handleSpeakerClick}
          className={`link link--${navlinkVariant}`}
        >
          SPEAKERS
        </li>
        <li
          onClick={handleHeadphoneClick}
          className={`link link--${navlinkVariant}`}
        >
          HEADPHONES
        </li>
        <li
          onClick={handleTelevisionClick}
          className={`link link--${navlinkVariant}`}
        >
          TELEVISIONS
        </li>
      </ul>
    </div>
  )
}

export default NavLinks
