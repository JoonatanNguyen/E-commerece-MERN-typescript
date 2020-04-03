import React from 'react'

import './styles.scss'

import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined'

type ShopButtonType = {
  isBorderButton: boolean
  buttonIconVariant: string
  buttonText: string
  buttonWidth: string
  borderVariant: string
  buttonMargin: string
  onButtonClick: () => void
}

const ShopButton = ({
  isBorderButton,
  buttonIconVariant,
  buttonText,
  buttonWidth,
  onButtonClick,
  borderVariant,
  buttonMargin,
}: ShopButtonType) => {
  return (
    <div
      className="button"
      style={{
        border: isBorderButton ? `3px solid ${borderVariant}` : 'unset',
        width: buttonWidth,
        margin: buttonMargin,
      }}
      onClick={onButtonClick}
    >
      <p className="button__text">{buttonText}</p>
      <TrendingFlatOutlinedIcon
        className={`button__icon button__icon--${buttonIconVariant}`}
      />
    </div>
  )
}

export default ShopButton
