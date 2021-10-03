import { 
  USER_LOGIN, 
  USER_LOGIN_SUCCESS, 
  USER_REGISTER, 
  USER_REGISTER_SUCCESS, 
  USER_LOGOUT, 
  AUTHENTICATION_FAIL 
} from './constants.store'
import { createAction } from 'redux-actions'

export const userLogin = createAction(USER_LOGIN)
export const userLoginSuccess = createAction(USER_LOGIN_SUCCESS)

export const userRegister = createAction(USER_REGISTER)
export const userRegisterSuccess = createAction(USER_REGISTER_SUCCESS)

export const userLogout = createAction(USER_LOGOUT)

export const authenticationFail = createAction(AUTHENTICATION_FAIL)
