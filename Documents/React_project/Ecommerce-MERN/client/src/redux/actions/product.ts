import { Dispatch } from 'redux'

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductActions,
  Product,
  SAVE_PRODUCT,
  ShoppingCart,
  USER_AUTHENTICATE,
  UserAuth,
  DECREASE_CART_QUANTITY,
  GET_CART_REQUEST,
} from '../../types'

export function storeAllProducts(product: Product[]): ProductActions {
  return {
    type: SAVE_PRODUCT,
    payload: {
      product,
    },
  }
}

export function userAuthenticate(userAuth: UserAuth) {
  return {
    type: USER_AUTHENTICATE,
    payload: {
      userAuth,
    },
  }
}

export function getCartProducts(): ProductActions {
  return {
    type: GET_CART_REQUEST,
  }
}

export function decreaseCartQuantity(productId: string): ProductActions {
  return {
    type: DECREASE_CART_QUANTITY,
    payload: {
      productId,
    },
  }
}

export function addProduct(product: ShoppingCart): ProductActions {
  return {
    type: ADD_PRODUCT,
    payload: {
      product,
    },
  }
}

export function removeProduct(product: ShoppingCart): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product,
    },
  }
}

// Async action processed by redux-thunk middleware
export function fetchProduct(productId: string) {
  return (dispatch: Dispatch) => {
    return fetch(`products/${productId}`)
      .then(resp => resp.json())
      .then(product => {
        dispatch(addProduct(product))
      })
  }
}
