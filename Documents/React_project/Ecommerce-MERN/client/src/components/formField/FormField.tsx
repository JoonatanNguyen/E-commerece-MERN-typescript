import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'

import './styles.scss'

import { googleSignin } from '../../redux/actions'

type FormFieldType = {
  isLogin: boolean
  formTitle: string
  buttonTitle: string
}

const FormField = ({ isLogin, formTitle, buttonTitle }: FormFieldType) => {
  const dispatch = useDispatch()

  async function responseGoogle(response: any) {
    const tokenResponse = {
      id_token: response.tokenObj.id_token,
    }
    await dispatch(googleSignin(tokenResponse))
  }
  return (
    <div className="form-field">
      <h1 className="form-field__title">{formTitle}</h1>
      <div className="form-field__options">
        {isLogin && (
          <GoogleLogin
            clientId="1078333593786-7m38k4290qmrrctuadbliskpb8dgdo2m.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        )}
        {isLogin && (
          <div className="login-divider">
            <strong className="login-divider__text">or</strong>
          </div>
        )}
        <form className="login-form">
          {!isLogin && (
            <div className="input-container">
              <input type="text" />
              <label>First Name</label>
            </div>
          )}
          {!isLogin && (
            <div className="input-container">
              <input type="text" />
              <label>Last Name</label>
            </div>
          )}
          {!isLogin && (
            <div className="input-container">
              <input type="text" />
              <label>Username</label>
            </div>
          )}

          <div className="input-container">
            <input type="text" />
            <label>Email</label>
          </div>

          <div className="input-container">
            <input type="text" />
            <label>Password</label>
          </div>
        </form>
      </div>
      <button>{buttonTitle}</button>
    </div>
  )
}

export default FormField
