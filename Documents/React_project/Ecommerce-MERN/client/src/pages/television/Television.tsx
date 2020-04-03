import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { AppState } from '../../types'
import NavigationBar from '../../components/navigation'
import MiddleContent from '../../components/middleContent'

export default function Television() {
  const history = useHistory()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const allProducts = useSelector((state: AppState) => state.product.all)
  const televisions = allProducts.filter(speaker =>
    speaker.categories?.includes('Speakers')
  )
  const videoAd =
    'https://videos.ctfassets.net/8cd2csgvqd3m/equabWKTHIt2gqFl9cC7w/d9533de2625a49384c52bc729d42af85/Beovision_Harmony_Milan_HD_Nographics.mp4'

  function handleTelevisionItemClick(productId: string) {
    history.push(`/products/televisions/${productId}`)
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
        onProductClick={handleTelevisionItemClick}
        productName="Televisions"
        videoAd={videoAd}
        productSource={televisions}
      />
    </div>
  )
}
