import React from 'react'

import './styles.scss'
import ShopButton from '../shopButton'

type ProductCardType = {
  productName: string
  productImage: string
  onClickButton: () => void
}

const SingleCard = ({
  productName,
  productImage,
  onClickButton,
}: ProductCardType) => {
  return (
    <div className="single-card">
      <p className="single-card__name">{productName}</p>
      <div className="single-card__image">
        <img src={productImage} alt="product" />
      </div>
      <ShopButton
        isBorderButton={false}
        buttonIconVariant="black"
        buttonText="VIEW ALL"
        buttonWidth="105px"
        onButtonClick={onClickButton}
        borderVariant=""
        buttonMargin=""
      />
    </div>
  )
}

export default SingleCard
