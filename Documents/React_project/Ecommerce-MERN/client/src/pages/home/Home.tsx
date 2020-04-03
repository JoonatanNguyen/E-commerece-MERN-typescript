import React from 'react'

import Header from '../../components/Header'
import ProductPanel from '../../components/productPanel/index'
import useFetchProducts from '../../hooks/useFetch'

const firstBackgroundImage =
  'https://images.ctfassets.net/8cd2csgvqd3m/4Pz9Cjtzhn2xIxR0fBE9VG/51546f2214bf4e12e8ec226149a24032/Balance_Home_Placeholder.jpg?q=90&fm=webp&w=1656&h=931&fit=fill'
const secondBackgroundImage =
  'https://images.ctfassets.net/8cd2csgvqd3m/6YiCW2UaMsMoYOKiByLt2r/cd688c5bc9a7ab6262101bd4aeb842d7/E8_3rd_gen_Hero.jpg?q=90&fm=webp&w=1656&h=931&fit=fill'

export default function Home() {
  useFetchProducts('')
  return (
    <div>
      <Header backgroundImage={firstBackgroundImage} />
      <Header backgroundImage={secondBackgroundImage} />
      <ProductPanel />
    </div>
  )
}
