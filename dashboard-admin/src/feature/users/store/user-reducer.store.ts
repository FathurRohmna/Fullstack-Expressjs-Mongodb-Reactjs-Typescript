import { GET_USERS, EDIT_USER, DELETE_USER, GET_USERS_SUCCESS, EDIT_USER_SUCCESS, DELETE_USER_SUCCESS, USERS_FAIL, GET_USERS_DATA, GET_USERS_DATA_SUCCESS } from './user-constants.store';
import { IUsers } from '../typing/state';
import { actionTypes } from './../typing/action';

interface IAction {
  type: actionTypes
  payload: IUsers
}

const initState: IUsers = {
  isLoading: false,
  isLoaded: false,
  items: [],
  usersData: [],
  error: null
}

const userReducer = (state = initState, action: IAction) => {
  const newUsers = { ...state }

  switch (action.type) {
    case GET_USERS | GET_USERS_DATA | EDIT_USER | DELETE_USER:
      return {
        ...state,
        isLoading: true
      }
    
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        items: action.payload
      }

    case GET_USERS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        usersData: action.payload
      }
    
    case EDIT_USER_SUCCESS:
      const userId = action.payload.newUser._id
      const recordIndex = state.items.users.findIndex(item => item._id === userId)

      newUsers.items.users[recordIndex] = {...action.payload.newUser}
      return newUsers
    
    case DELETE_USER_SUCCESS:
      const deleteId = action.payload.userId
      newUsers.items.users = state.items.users.filter(item => item._id !== deleteId)
      return newUsers
    
    case USERS_FAIL:
      return {
        ...state,
        isLoaded: true,
        error: action.payload
      }
    default:
      return state || {}
  }
}

export default userReducer
