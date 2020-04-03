import { UserState, UserActions, STORE_USER_TOKEN } from '../../types'

const defaultState: UserState = {
  userToken: '',
}

export default function user(
  state: UserState = defaultState,
  action: UserActions
): UserState {
  switch (action.type) {
    case STORE_USER_TOKEN: {
      return {
        ...state,
        userToken: action.payload.token,
      }
    }

    default:
      return state
  }
}
