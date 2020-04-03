import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { storeAllProducts } from '../redux/actions'
import { Product } from '../types'

const useFetchProducts = (productId: string | undefined) => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [productDetail, setProductDetail] = useState<Product>()
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/products/')
      .then(response => {
        setAllProducts(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  dispatch(storeAllProducts(allProducts))

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/products/${productId}`)
      .then(response => {
        setProductDetail(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [productId])

  return { allProducts, productDetail }
}

export default useFetchProducts
