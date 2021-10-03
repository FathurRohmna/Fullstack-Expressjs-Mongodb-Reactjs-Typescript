import { 
  GET_USERS, 
  GET_USERS_SUCCESS, 
  EDIT_USER, 
  EDIT_USER_SUCCESS,
  DELETE_USER, 
  DELETE_USER_SUCCESS, 
  USERS_FAIL,
  GET_USERS_DATA,
  GET_USERS_DATA_SUCCESS
} from './user-constants.store';
import { createAction } from 'redux-actions'

export const getUsers = createAction(GET_USERS)
export const getUsersSuccess = createAction(GET_USERS_SUCCESS)

export const getUsersData = createAction(GET_USERS_DATA)
export const getUsersDataSuccess = createAction(GET_USERS_DATA_SUCCESS)

export const editUser = createAction(EDIT_USER)
export const editUserSuccess = createAction(EDIT_USER_SUCCESS)

export const deleteUser = createAction(DELETE_USER)
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS)

export const usersFail = createAction(USERS_FAIL)
