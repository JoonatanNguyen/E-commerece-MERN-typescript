import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { AppState } from '../../types'
import NavigationBar from '../../components/navigation'
import MiddleContent from '../../components/middleContent'

export default function Headphone() {
  const history = useHistory()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const allProducts = useSelector((state: AppState) => state.product.all)
  const headphones = allProducts.filter(speaker =>
    speaker.categories.includes('Speakers')
  )
  const videoAd =
    'https://videos.ctfassets.net/8cd2csgvqd3m/28JvSxLCtA9Qs1Jx8kOaWJ/4c933823cb7b617e11dab90a28b98f7c/E8_3gen_London_Stories_Web_Trailer.mp4'

  function handleHeadphoneItemClick(productId: string) {
    history.push(`/products/headphones/${productId}`)
  }

  return (
    <div>
      <NavigationBar
        isBlackLogo={true}
        iconNavVariant="black"
        navlinkVariant="black"
        sideMenuVariant="black"
        shouldHaveBorder={true}
      />
      <MiddleContent
        onProductClick={handleHeadphoneItemClick}
        productName="Headphones"
        videoAd={videoAd}
        productSource={headphones}
      />
    </div>
  )
}
