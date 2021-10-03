import { getCategoriesApi, deleteCategoryApi, postCategoriesApi } from './category-api-service.store'
import { put } from 'redux-saga/effects'

import * as actions from './category-actions.store'

export function* getCategories() {
  try {
    const categories = yield getCategoriesApi()

    yield put(actions.getCategoriesSuccess(categories.data))
  } catch (error) {
    yield put(actions.categoryFail(error.message))
  }
}

export function* postCategoriesSaga({payload}: ReturnType<typeof postCategories>) {
  try {
    const response = yield postCategoriesApi(payload)

    if (response.response) {
      yield put(actions.categoryFail(response.response.data))
    } else {
      yield put(actions.postCategoriesSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.categoryFail(error.message))
  }
}

export function* deleteCategorySaga({payload}: ReturnType<string>) {
  try {
    const response = yield deleteCategoryApi(payload)

    if (response.response) {
      yield put(actions.categoryFail(response.response.data))
    } else {
      yield put(actions.deleteCategorySuccess(response.data))
    }
  } catch (error) {
    yield put(actions.categoryFail(error.message))
  }
}