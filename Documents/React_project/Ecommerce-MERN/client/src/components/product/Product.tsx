import React from 'react'

import './styles.scss'

type ColorsType = {
  image: string[]
  _id: string
  color: string
  colorSpecific: string
}

type ProductType = {
  productImage: string
  productName: string
  description: string
  colors: ColorsType[]
  price: number
  productId: string
  onProductClick: (productId: string) => void
}

const Product = ({
  productImage,
  productName,
  description,
  colors,
  price,
  onProductClick,
  productId,
}: ProductType) => {
  return (
    <div className="product-wrapper" onClick={() => onProductClick(productId)}>
      <div className="product-wrapper__image">
        <img src={productImage} alt="product" />
      </div>
      <div className="product-info">
        <div className="product-info__name">{productName}</div>
        <div className="product-info__description">{description}</div>
        <div className="product-info__colors">
          {colors &&
            colors.map(color => (
              <div
                key={color._id}
                className="palette-circle"
                style={{ backgroundColor: color.colorSpecific }}
              />
            ))}
        </div>
        <div className="product-info__price">€{price}</div>
      </div>
    </div>
  )
}

export default Product
