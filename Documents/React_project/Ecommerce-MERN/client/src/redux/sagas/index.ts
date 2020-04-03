import { fork, all } from 'redux-saga/effects'

import {
  setAllProductToLocalStorage,
  getCartProduct,
  decreaseCartQuantity,
} from './product'
import uiSagas from './ui'
import { GoolgeSignin } from './user'

export default function* rootSaga() {
  yield all([
    ...uiSagas,
    fork(setAllProductToLocalStorage),
    fork(getCartProduct),
    fork(decreaseCartQuantity),
    fork(GoolgeSignin),
  ])
}
