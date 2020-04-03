import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _isEmpty from 'lodash/isEmpty'

import './styles.scss'

import NavigationBar from '../../components/navigation'
import { Product, AppState } from '../../types'
import { getCartProducts, decreaseCartQuantity } from '../../redux/actions'
import CheckoutItem from '../../components/checkoutItem '

const Checkout = () => {
  const dispatch = useDispatch()
  const allProducts = localStorage.getItem('all_products') || ''
  let product: any = []
  const cart = useSelector((state: AppState) => state.product.inCart)

  useEffect(() => {
    dispatch(getCartProducts())
  }, [dispatch])

  if (!_isEmpty(allProducts)) {
    const productParse: Product[] = JSON.parse(allProducts)
    let productIdsInCart = cart.map(product => product.productId)
    product = productParse
      .filter(product => productIdsInCart.includes(product._id))
      .map(product => {
        const productWithDetail = cart.find(
          item => item.productId === product._id
        )
        return {
          quantity: productWithDetail?.quantity,
          variantId: productWithDetail?.variantId,
          ...product,
        }
      })
  }
  function handleDecreaseProductClick(productId: string) {
    dispatch(decreaseCartQuantity(productId))
  }

  return (
    <>
      <NavigationBar
        isBlackLogo={true}
        iconNavVariant="black"
        navlinkVariant="black"
        sideMenuVariant="black"
        shouldHaveBorder={true}
      />
      <div className="content-wrapper">
        <p className="title">BASKET</p>
        <h3 className="label">Your selected items</h3>
        <div className="product-basket">
          {_isEmpty(cart) ? (
            <div className="product-basket__empty-basket">
              Your basket is empty
            </div>
          ) : (
            product.map((product: any) => {
              const productColorImage = product.variants.filter(
                (v: any) => v._id === product.variantId
              )
              return (
                <CheckoutItem
                  key={product._id}
                  product={product}
                  onDecreaseProductClick={handleDecreaseProductClick}
                  productImageColor={productColorImage[0]}
                />
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default Checkout
