import { combineReducers } from 'redux'

import product from './product'
import ui from './ui'
import user from './user'

const createRootReducer = () =>
  combineReducers({
    product,
    ui,
    user,
  })

export default createRootReducer
