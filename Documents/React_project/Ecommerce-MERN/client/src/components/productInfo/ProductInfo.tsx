import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './styles.scss'

import ShopButton from '../shopButton'
import { Product } from '../../types'
import UserRepository from '../../redux/repositories/productRepositories'
import { addProduct } from '../../redux/actions/product'

type ProductDetailType = {
  productDetail: Product
}

const ProductInfo = ({ productDetail }: ProductDetailType) => {
  const dispatch = useDispatch()
  const [currentColorId, setCurrentColorId] = useState<string>()

  function handleBuyButtonClick(productId: string) {
    const userId = localStorage.getItem('user_id')
    const addedProduct = {
      productId: productId,
      variantId: currentColorId || productDetail.variants[0]._id,
      quantity: 1,
    }
    UserRepository.addProductToCart(userId, addedProduct)
    dispatch(addProduct(addedProduct))
  }

  const colorName = productDetail.variants.find(
    variant => variant._id === currentColorId
  )

  return (
    <div className="info-wrapper">
      <div className="info">
        <div className="info-wrapper__name">{productDetail.name}</div>
        <div className="info-wrapper__short-description">
          {productDetail.shortDescription}
        </div>
        <div className="info-wrapper__long-description">
          {productDetail.longDescription}
        </div>
        <div className="info-wrapper__color">
          <div className="palette">
            {productDetail.variants.map(color => (
              <div
                key={color._id}
                className="palette__circle"
                style={{ backgroundColor: color.colorSpecific }}
                onClick={() => setCurrentColorId(color._id)}
              />
            ))}
          </div>
          <div className="palette__name">
            {!colorName?.color
              ? productDetail.variants[0].color
              : colorName?.color}
          </div>
        </div>
        <div className="info-wrapper__price">
          <div>€{productDetail.price}</div>
        </div>
        <ShopButton
          isBorderButton={true}
          buttonIconVariant="black"
          buttonText="BUY"
          buttonWidth="50%"
          onButtonClick={() => handleBuyButtonClick(productDetail._id)}
          borderVariant="red"
          buttonMargin="0 0 0 49%"
        />
        <ShopButton
          isBorderButton={true}
          buttonIconVariant="black"
          buttonText="EXPERIENCE IN STORE"
          buttonWidth="50%"
          onButtonClick={() => {}}
          borderVariant="black"
          buttonMargin="20px 0 0 49%"
        />
      </div>
    </div>
  )
}

export default ProductInfo
