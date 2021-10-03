import { GET_USERS, GET_USERS_DATA, EDIT_USER, DELETE_USER } from './../users/store/user-constants.store';
import { GET_ARTICLE, POST_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE } from './../article/store/article-constants.store';
import { GET_CATEGORY, DELETE_CATEGORY, POST_CATEGORY } from './../category/store/category-constants.store';
/* eslint-disable import/no-anonymous-default-export */
import { USER_LOGIN, USER_REGISTER } from './../authentication/store/constants.store'

import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import * as authenticationSaga from '../authentication/store/sagas.store'
import * as categorySaga from '../category/store/category-sagas.store'
import * as articleSaga from '../article/store/article-sagas.store' 
import * as userSaga from '../users/store/user-sagas.store'

export default function*() {
  yield all([
    takeEvery(USER_LOGIN, authenticationSaga.userLogin),
    takeEvery(USER_REGISTER, authenticationSaga.userRegister),
    takeLatest(GET_CATEGORY, categorySaga.getCategories),
    takeEvery(POST_CATEGORY, categorySaga.postCategoriesSaga),
    takeEvery(DELETE_CATEGORY, categorySaga.deleteCategorySaga),
    takeLatest(GET_ARTICLE, articleSaga.getArticles),
    takeEvery(POST_ARTICLE, articleSaga.postArticlesSaga),
    takeEvery(EDIT_ARTICLE, articleSaga.editArticleSaga),
    takeEvery(DELETE_ARTICLE, articleSaga.deleteArticleSaga),
    takeLatest(GET_USERS, userSaga.getUsers),
    takeLatest(GET_USERS_DATA, userSaga.getUsersData),
    takeEvery(EDIT_USER, userSaga.editUserSaga),
    takeEvery(DELETE_USER, userSaga.deleteUserSaga)
  ])
}
