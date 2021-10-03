import { getUsersApi, getUsersDataApi, editUserApi, deleteUserApi } from './user-api-service.store';
import { put } from 'redux-saga/effects'

import * as actions from './user-actions.store'

export function* getUsers() {
  try {
    const users = yield getUsersApi()

    console.log(users.data);
    yield put(actions.getUsersSuccess(users.data))
  } catch (error) {
    yield put(actions.usersFail(error.message))
  }
}

export function* getUsersData() {
  try {
    const usersData = yield getUsersDataApi()

    yield put(actions.getUsersDataSuccess(usersData.data))
  } catch (error) {
    console.log(error.message);
  }
}

export function* editUserSaga({payload}: ReturnType<any>) {
  try {
    const response = yield editUserApi(payload._id, payload)

    if (response.response) {
      yield put(actions.usersFail(response.response.data))
    } else {
      yield put(actions.editUserSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.usersFail(error.message))
  }
}

export function* deleteUserSaga({payload}: ReturnType<string>) {
  try {
    const response = yield deleteUserApi(payload)

    if (response.response) {
      yield put(actions.usersFail(response.response.data))
    } else {
      yield put(actions.deleteUserSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.usersFail(error.message))
  }
}