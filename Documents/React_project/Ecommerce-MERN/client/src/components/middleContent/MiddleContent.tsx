import React from 'react'

import './styles.scss'

import SingleProduct from '../product'
import { Product } from '../../types'

type MiddleContentType = {
  productName: string
  videoAd: string
  productSource: Product[]
  onProductClick: (productId: string) => void
}

const MiddleContent = ({
  productName,
  videoAd,
  productSource,
  onProductClick,
}: MiddleContentType) => {
  return (
    <div className="middle-wrapper">
      <div className="content-container">
        <div className="product-name">
          <p className="product-name__name">{productName}</p>
        </div>
        <div className="advertisement-video">
          <video autoPlay loop>
            <source src={videoAd} />
          </video>
        </div>
        <div className="products">
          <p>All</p>
          <div className="products__grid">
            {productSource &&
              productSource.map(product => (
                <SingleProduct
                  key={product._id}
                  productImage={product.medias[0]}
                  productName={product.name}
                  description={product.shortDescription}
                  colors={product.variants}
                  price={product.price}
                  productId={product._id}
                  onProductClick={() => onProductClick(product._id)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiddleContent
