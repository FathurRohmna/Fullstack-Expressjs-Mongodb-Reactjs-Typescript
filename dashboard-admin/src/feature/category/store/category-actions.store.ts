import { 
  GET_CATEGORY, 
  GET_CATEGORY_SUCCESS, 
  DELETE_CATEGORY, 
  DELETE_CATEGORY_SUCCESS, 
  POST_CATEGORY, 
  POST_CATEGORY_SUCESS, 
  CATEGORY_FAIL 
} from './category-constants.store'
import { createAction } from 'redux-actions'

export const getCategories = createAction(GET_CATEGORY)
export const getCategoriesSuccess = createAction(GET_CATEGORY_SUCCESS)

export const deleteCategory = createAction(DELETE_CATEGORY)
export const deleteCategorySuccess = createAction(DELETE_CATEGORY_SUCCESS)

export const postCategories = createAction(POST_CATEGORY)
export const postCategoriesSuccess = createAction(POST_CATEGORY_SUCESS)

export const categoryFail = createAction(CATEGORY_FAIL)