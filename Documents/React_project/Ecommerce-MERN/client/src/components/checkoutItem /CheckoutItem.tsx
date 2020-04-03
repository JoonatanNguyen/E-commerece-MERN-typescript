import React from 'react'

import './styles.scss'

type CheckoutItemType = {
  product: any
  productImageColor: {
    image: string[]
    _id: string
    color: string
    colorSpecific: string
  }

  onDecreaseProductClick: (productId: string) => void
}

const CheckoutItem = ({
  product,
  onDecreaseProductClick,
  productImageColor,
}: CheckoutItemType) => {
  return (
    <div className="added-product-wrapper">
      <div className="added-product-wrapper__image">
        <img src={productImageColor.image[0]} alt="product" />
      </div>
      <div className="product-cart-info">
        <div className="product-cart-info__name">{product.name}</div>
        <div>
          <button onClick={() => onDecreaseProductClick(product._id)}>-</button>
          <div>{product.quantity}</div>
          <button>+</button>
        </div>
        <div className="product-cart-info__price">
          €{product.quantity * product.price}
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
