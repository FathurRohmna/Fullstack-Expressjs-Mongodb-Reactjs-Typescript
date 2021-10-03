import { 
  GET_ARTICLE, 
  GET_ARTICLE_SUCCESS, 
  POST_ARTICLE, 
  POST_ARTICLE_SUCCESS, 
  DELETE_ARTICLE, 
  DELETE_ARTICLE_SUCCESS,
  EDIT_ARTICLE,
  EDIT_ARTICLE_SUCCESS,
  ARTICLE_FAIL 
} from './article-constants.store'
import { createAction } from 'redux-actions'

export const getArticle = createAction(GET_ARTICLE)
export const getArticleSuccess = createAction(GET_ARTICLE_SUCCESS)

export const postArticle = createAction(POST_ARTICLE)
export const postArticleSuccess = createAction(POST_ARTICLE_SUCCESS)

export const editArticle = createAction(EDIT_ARTICLE)
export const editArticleSuccess = createAction(EDIT_ARTICLE_SUCCESS)

export const deleteArticle = createAction(DELETE_ARTICLE)
export const deleteArticleSuccess = createAction(DELETE_ARTICLE_SUCCESS)

export const articleFail = createAction(ARTICLE_FAIL)
