import { 
  getArticlesApi, 
  postArticlesApi, 
  deleteArticleApi, 
  editArticleApi 
} from './article-api-service.store'
import { put } from 'redux-saga/effects'

import * as actions from './article-actions.store'

export function* getArticles() {
  try {
    const articles = yield getArticlesApi()

    yield put(actions.getArticleSuccess(articles.data))
  } catch (error) {
    yield put(actions.articleFail(error.message))
  }
}

export function* postArticlesSaga({payload}: ReturnType<typeof postArticles>) {
  try {
    const response = yield postArticlesApi(payload)

    if (response.response) {
      yield put(actions.articleFail(response.response.data))
    } else {
      yield put(actions.postArticleSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.articleFail(error.message))
  }
}

export function* deleteArticleSaga({payload}: ReturnType<string>) {
  try {
    const response = yield deleteArticleApi(payload)

    if (response.response) {
      yield put(actions.articleFail(response.response.data))
    } else {
      yield put(actions.deleteArticleSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.articleFail(error.message))
  }
}

export function* editArticleSaga({payload}: ReturnType<any>) {
  try {
    const response = yield editArticleApi(payload._id, payload)

    if (response.response) {
      yield put(actions.articleFail(response.response.data))
    } else {
      yield put(actions.editArticleSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.articleFail(error.message))
  }
}