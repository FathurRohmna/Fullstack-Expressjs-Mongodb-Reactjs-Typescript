import { 
  USER_LOGIN, 
  USER_LOGIN_SUCCESS, 
  USER_REGISTER, 
  USER_REGISTER_SUCCESS, 
  AUTHENTICATION_FAIL 
} from './constants.store'
import { IAuthentication } from './../typing/state/authentication.interface';
import { actionTypes } from './../typing/action'

interface IAction {
  type: actionTypes
  payload: IAuthentication
}

const initState: IAuthentication = {
  isLoading: false,
  isLoaded: false,
  error: null,
  user: null
}

const authenticationReducer = (state = initState, action: IAction) => {
  switch (action.type) {
    case USER_LOGIN || USER_REGISTER:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOGIN_SUCCESS || USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: action.payload,
        error: null
      }
    case AUTHENTICATION_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: action.payload
      }
    default: 
      return state
  } 
}

export default authenticationReducer
