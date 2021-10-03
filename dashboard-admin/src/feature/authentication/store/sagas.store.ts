import { loginUser, registerUser } from './api-service.store';
import { put } from 'redux-saga/effects'

import * as actions from './actions.store'

export function* userLogin({payload}: ReturnType<any>) {
  try {
    const response = yield loginUser(payload)

    if (response.response) {
      yield put(actions.authenticationFail(response.response.data))
    } else {
      yield put(actions.userLoginSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.authenticationFail(error.message))
  }
}

export function* userRegister({payload}: ReturnType<any>) {
  try {
    const response = yield registerUser(payload)

    if (response.response) {
      yield put(actions.authenticationFail(response.response.data))
    } else {
      yield put(actions.userRegisterSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.authenticationFail(error.message))
  }
}
