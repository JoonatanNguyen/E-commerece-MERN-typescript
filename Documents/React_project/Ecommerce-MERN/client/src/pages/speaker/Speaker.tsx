import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { AppState } from '../../types'
import NavigationBar from '../../components/navigation'
import MiddleContent from '../../components/middleContent'

export default function Speaker() {
  const history = useHistory()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const allProducts = useSelector((state: AppState) => state.product.all)
  const speakers = allProducts.filter(speaker =>
    speaker.categories?.includes('Speakers')
  )
  const videoAd =
    'https://videos.ctfassets.net/8cd2csgvqd3m/69RhPqGDsVGokkRS8gXCQJ/86a28f7797471a376be4a04147f35419/Contrast_short_speakers.mp4'

  function handleProductClick(productId: string) {
    history.push(`/products/speakers/${productId}`)
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
        onProductClick={handleProductClick}
        productName="Speakers"
        videoAd={videoAd}
        productSource={speakers}
      />
    </div>
  )
}
