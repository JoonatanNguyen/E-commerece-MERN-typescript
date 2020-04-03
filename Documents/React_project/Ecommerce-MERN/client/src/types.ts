// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'
export const SAVE_PRODUCT = 'SAVE_PRODUCT'
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL'
export const GET_CART_REQUEST = 'GET_CART_REQUEST'
export const GET_CART = 'GET_CART'
export const GET_CART_FAILURE = 'GET_CART_FAILURE'
export const USER_AUTHENTICATE = 'USER_AUTHENTICATE'
export const DECREASE_CART_QUANTITY = 'DECREASE_CART_QUANTITY'
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN'
export const STORE_USER_TOKEN = 'STORE_USER_TOKEN'

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  _id: string
  name: string
  shortDescription: string
  longDescription: string
  variants: [
    {
      image: string[]
      _id: string
      color: string
      colorSpecific: string
    }
  ]
  medias: string[]
  categories: string[]
  price: number
}

export type ShoppingCart = {
  productId: string
  variantId: string
  quantity: number
}

export type UserAuth = {
  isAdmin: boolean
  _id: string
  email: string
  username: string
  shoppingCart: ShoppingCart[]
}

export type SaveAllProduct = {
  type: typeof SAVE_PRODUCT
  payload: {
    product: Product[]
  }
}

export type UserAuthenticate = {
  type: typeof USER_AUTHENTICATE
  payload: {
    userAuthInfo: UserAuth
  }
}

export type GoogleLogin = {
  type: typeof GOOGLE_LOGIN
  payload: { tokenId: any }
}

export type GetCartProducts = {
  type: typeof GET_CART
  payload: {
    product: ShoppingCart[]
  }
}

export type GetCartProductsRequest = {
  type: typeof GET_CART_REQUEST
}

export type GetCartProductsFailure = {
  type: typeof GET_CART_FAILURE
  payload: {
    error: any
  }
}

export type DecreaseCartQuantity = {
  type: typeof DECREASE_CART_QUANTITY
  payload: {
    productId: string
  }
}

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: ShoppingCart
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: ShoppingCart
  }
}

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG
  payload: {
    dialog: DialogType
  }
}

export type StoreUserToken = {
  type: typeof STORE_USER_TOKEN
  payload: {
    token: string
  }
}

export type UiActions = ToggleDialogAction

// Use this union in reducer
export type ProductActions =
  | SaveAllProduct
  | GetCartProducts
  | GetCartProductsRequest
  | GetCartProductsFailure
  | DecreaseCartQuantity
  | AddProductAction
  | RemoveProductAction

export type UserActions = GoogleLogin | StoreUserToken

export type ProductState = {
  all: Product[]
  inCart: ShoppingCart[]
  errors: any
}

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean
  }
}

export type UserState = {
  userToken: string
}

export type AppState = {
  product: ProductState
  ui: UiState
  user: UserState
}
