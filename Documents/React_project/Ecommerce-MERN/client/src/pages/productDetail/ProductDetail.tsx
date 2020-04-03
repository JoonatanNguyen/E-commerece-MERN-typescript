import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './styles.scss'

import NavigationBar from '../../components/navigation'
import ProductCarousel from '../../components/ProductCarousel'
import ProductInfo from '../../components/productInfo'
import useFetchProducts from '../../hooks/useFetch'

const videoAdRound =
  'https://videos.ctfassets.net/8cd2csgvqd3m/6qP6AwwJfKXl7kt0bVMQXh/773b79a49c2445e4842e40ab17e9f1cf/Beosound_Balance_Animations_16x9.mp4'
const videoAd =
  'https://videos.ctfassets.net/8cd2csgvqd3m/3B4qwSWxHo4ejpSBxEAZCG/ba90a9af2157e08fc107d22824a73acd/B_O_Balance_-_Desktop.mp4'

const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { id } = useParams()
  const { productDetail } = useFetchProducts(id)

  if (!productDetail) return null

  return (
    <div className="detail-wrapper">
      <NavigationBar
        isBlackLogo={true}
        iconNavVariant="black"
        navlinkVariant="black"
        sideMenuVariant="black"
        shouldHaveBorder={true}
      />
      <div className="content">
        <div className="content__product">
          <ProductCarousel productImage={productDetail.variants[0].image[0]} />
          <ProductInfo productDetail={productDetail} />
        </div>
        <div className="content__round-video">
          <video autoPlay loop muted>
            <source src={videoAdRound}></source>
          </video>
        </div>
        <div className="detail-info">
          <h3>The design</h3>
          <p className="detail-info__label">Scandinavian minimalism</p>
          <p className="detail-info__description">
            An interior silhouette balancing gracefully on a base of natural
            wood. The simplicity of this design, rooted in Scandinavian
            minimalism, contrasts strongly with its raw, high-performing sound.
            And with a shape distinctly broken into two components, Beosound
            Balance is luxurious design in an interior object form. We
            collaborated on the design with Benjamin Hubert of Layer Design, a
            creative studio from London highly specialized not only in design
            but also in creating unique user interfaces.{' '}
          </p>
        </div>
        <div className="content__advertisement-video">
          <video autoPlay loop muted>
            <source src={videoAd}></source>
          </video>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
