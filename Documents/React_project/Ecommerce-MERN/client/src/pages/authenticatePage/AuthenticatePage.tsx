import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.scss'

import NavigationBar from '../../components/navigation'
import FormField from '../../components/formField'
import { AppState } from '../../types'
import { storeUserToken } from '../../redux/actions'

const AuthenticatePage = () => {
  const username = localStorage.getItem('username')
  const dispatch = useDispatch()

  const isUserLogin = useSelector((state: AppState) => state.user.userToken)

  function handleLogoutFunction() {
    localStorage.removeItem('is_admin')
    localStorage.removeItem('username')
    localStorage.removeItem('id_token')
    localStorage.removeItem('shopping_cart')
    dispatch(storeUserToken(''))
  }

  return (
    <div className="authenticate-page-wrapper">
      <NavigationBar
        isBlackLogo={true}
        iconNavVariant="black"
        navlinkVariant="black"
        sideMenuVariant="black"
        shouldHaveBorder={true}
      />
      <div className="content-wrapper">
        {!isUserLogin ? (
          <>
            <FormField formTitle="LOGIN" isLogin={true} buttonTitle="LOGIN" />
            <FormField
              formTitle="REGISTER"
              isLogin={false}
              buttonTitle="REGISTER"
            />
          </>
        ) : (
          <>
            <h1>WELCOME {username}</h1>
            <p className="logout-button" onClick={handleLogoutFunction}>
              LOGOUT
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthenticatePage
