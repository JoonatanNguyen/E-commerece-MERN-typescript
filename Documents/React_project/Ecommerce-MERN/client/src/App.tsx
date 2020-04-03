import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Routes from './Routes'

import './App.scss'
import { storeUserToken, getCartProducts } from './redux/actions'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const userTokenLocalStorage = localStorage.getItem('id_token')
    if (userTokenLocalStorage) {
      dispatch(storeUserToken(userTokenLocalStorage))
    }
    dispatch(getCartProducts())
  }, [dispatch])

  return (
    <>
      <Routes />
    </>
  )
}
