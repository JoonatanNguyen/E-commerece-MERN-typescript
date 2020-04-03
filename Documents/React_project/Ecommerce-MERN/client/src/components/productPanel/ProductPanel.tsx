import React from 'react'
import { useHistory } from 'react-router-dom'

import './styles.scss'
import SingleCard from '../singleCard'

const speakerImage =
  'https://images.ctfassets.net/8cd2csgvqd3m/1MW5Ya0oS4ub8jlu8YkuJQ/da12a5d4d6444a8f65786a7dda4474d0/A9-smoked.png?q=90&fm=webp&w=480&h=480&fit=fill'
const headPhoneImage =
  'https://images.ctfassets.net/8cd2csgvqd3m/4LTok6tVuMsAeckUQAA6qO/39ce54c11181604e691ec101744f9426/h9i_black_hero.png?q=90&fm=webp&w=480&h=480&fit=fill'
const televisionImage =
  'https://images.ctfassets.net/8cd2csgvqd3m/221e09q878ELXXTP1LFck2/4e1a4fbce8a96eebdc12d0d922a14a6a/BeoVisionV300-77-Closed-Oak-F0.png?q=90&fm=webp&w=480&h=480&fit=fill'

const ProductPanel = () => {
  let history = useHistory()
  function handleSpeakerButtonClick() {
    history.push('/products/speakers')
  }
  function handleHeadphoneButtonClick() {
    history.push('/products/headphones')
  }
  function handleTelevisionButtonClick() {
    history.push('/products/televisions')
  }

  return (
    <div className="product-panel">
      <SingleCard
        productName="Speakers"
        productImage={speakerImage}
        onClickButton={handleSpeakerButtonClick}
      />
      <SingleCard
        productName="Headphones"
        productImage={headPhoneImage}
        onClickButton={handleHeadphoneButtonClick}
      />
      <SingleCard
        productName="Televisions"
        productImage={televisionImage}
        onClickButton={handleTelevisionButtonClick}
      />
    </div>
  )
}

export default ProductPanel
