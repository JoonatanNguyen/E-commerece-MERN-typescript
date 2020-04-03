import {
  ProductState,
  ProductActions,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  SAVE_PRODUCT,
  GET_CART,
  GET_CART_FAILURE,
} from '../../types'

export default function product(
  state: ProductState = {
    all: [],
    inCart: [],
    errors: {},
  },
  action: ProductActions
): ProductState {
  switch (action.type) {
    case SAVE_PRODUCT: {
      return { ...state, all: action.payload.product }
    }

    case GET_CART: {
      return { ...state, inCart: action.payload.product }
    }

    case GET_CART_FAILURE: {
      return { ...state, errors: action.payload.error }
    }

    case ADD_PRODUCT: {
      const { product } = action.payload
      return { ...state, inCart: [...state.inCart, product] }
    }

    case REMOVE_PRODUCT: {
      const { product } = action.payload
      const index = state.inCart.findIndex(
        p => p.productId === product.productId
      )
      if (index >= 0) {
        state.inCart.splice(index, 1)
        return { ...state, inCart: [...state.inCart] }
      }
      return state
    }

    default:
      return state
  }
}
