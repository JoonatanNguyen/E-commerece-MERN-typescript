import { GOOGLE_LOGIN, UserActions, STORE_USER_TOKEN } from '../../types'

export function googleSignin(tokenId: any): UserActions {
  return {
    type: GOOGLE_LOGIN,
    payload: {
      tokenId,
    },
  }
}

export function storeUserToken(token: string): UserActions {
  return {
    type: STORE_USER_TOKEN,
    payload: {
      token,
    },
  }
}
