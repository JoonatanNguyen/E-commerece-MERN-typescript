import React from 'react'

import './styles.scss'

type ProductCarouselType = {
  productImage: string
}

const ProductCarousel = ({ productImage }: ProductCarouselType) => {
  return (
    <div className="carousel-wrapper">
      <img src={productImage} alt="product" />
    </div>
  )
}

export default ProductCarousel
