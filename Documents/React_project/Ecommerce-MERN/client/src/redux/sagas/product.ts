import { takeLatest, takeEvery, select, call, put } from 'redux-saga/effects'

import {
  ADD_PRODUCT,
  AddProductAction,
  SAVE_PRODUCT,
  GET_CART,
  GET_CART_REQUEST,
  DECREASE_CART_QUANTITY,
  DecreaseCartQuantity,
  GET_CART_FAILURE,
} from '../../types'

import ProductRepository from '../repositories/productRepositories'

function* doSomethingWhenAddingProduct(action: AddProductAction) {
  yield console.log(action)
}

export function* setAllProductToLocalStorage() {
  yield takeEvery(SAVE_PRODUCT, function*() {
    const state = yield select(state => state.product.all)
    yield localStorage.setItem('all_products', JSON.stringify(state))
  })
}

export function* getCartProduct() {
  yield takeEvery(GET_CART_REQUEST, function*() {
    try {
      const response = yield call(ProductRepository.getCartProduct)
      if (response.status === 'error') {
        throw response
      }
      yield put({
        type: GET_CART,
        payload: {
          product: response.data.shoppingCart,
        },
      })
    } catch (error) {
      yield put({
        type: GET_CART_FAILURE,
        payload: { error: error },
      })
    }
  })
}

export function* decreaseCartQuantity() {
  yield takeEvery(DECREASE_CART_QUANTITY, function*({
    payload: { productId },
  }: DecreaseCartQuantity) {
    try {
      yield call(ProductRepository.decreaseCartQuantity, productId)
      const cart: any = yield call(ProductRepository.getCartProduct)
      yield put({
        type: GET_CART,
        payload: { product: cart.data.shoppingCart },
      })
    } catch {}
  })
}

export default [takeLatest(ADD_PRODUCT, doSomethingWhenAddingProduct)]
