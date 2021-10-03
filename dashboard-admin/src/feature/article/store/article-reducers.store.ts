import { 
  GET_ARTICLE, 
  POST_ARTICLE, 
  DELETE_ARTICLE, 
  EDIT_ARTICLE, 
  GET_ARTICLE_SUCCESS, 
  POST_ARTICLE_SUCCESS, 
  EDIT_ARTICLE_SUCCESS, 
  DELETE_ARTICLE_SUCCESS, 
  ARTICLE_FAIL 
} from './article-constants.store';
import { IArticles } from '../typing/state';
import { actionTypes } from '../typing/action';

interface IAction {
  type: actionTypes,
  payload: IArticles
}

const newState: IArticles = {
  items: [],
  isLoading: false, 
  isLoaded: false, 
  error: null
}

const articlesReducer = (state = newState, action: IAction) => {
  const newArticles = {...state}

  switch (action.type) {
    case GET_ARTICLE || POST_ARTICLE || DELETE_ARTICLE || EDIT_ARTICLE:
      return {
        ...state,
        isLoading: true
      }

    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        items: action.payload
      }

    case POST_ARTICLE_SUCCESS:
      newArticles.items.articles = [...state.items.articles, action.payload.ArticleId]
      return newArticles

    case EDIT_ARTICLE_SUCCESS:
      const itemId = action.payload.newArticle._id
      const recordIndex = state.items.articles.findIndex(item => item._id === itemId)

      newArticles.items.articles[recordIndex] = {...action.payload.newArticle}
      return newArticles

    case DELETE_ARTICLE_SUCCESS:
      const deleteId = action.payload.ArticleId
      newArticles.items.articles = state.items.articles.filter(item => item._id !== deleteId)
      return newArticles

    case ARTICLE_FAIL:
      return {
        ...state,
        isLoaded: true,
        error: action.payload
      }
    default:
      return state || {}
  }
}

export default articlesReducer
