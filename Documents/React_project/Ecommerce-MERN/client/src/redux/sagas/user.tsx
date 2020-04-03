import { takeEvery, call, put } from 'redux-saga/effects'

import { GOOGLE_LOGIN, GoogleLogin, STORE_USER_TOKEN } from '../../types'

import AuthRepository from '../repositories/authRepositories'

export function* GoolgeSignin() {
  yield takeEvery(GOOGLE_LOGIN, function*({
    payload: { tokenId },
  }: GoogleLogin) {
    const response: any = yield call(AuthRepository.googleLogin, tokenId)
    localStorage.setItem('username', response.data.username)
    localStorage.setItem('id_token', response.data.token)
    localStorage.setItem('is_admin', response.data.isAdmin)

    yield put({
      type: STORE_USER_TOKEN,
      payload: {
        token: response.data.token,
      },
    })
  })
}
