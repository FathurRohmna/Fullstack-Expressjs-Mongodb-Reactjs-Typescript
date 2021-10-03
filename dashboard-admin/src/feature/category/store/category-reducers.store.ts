import { 
  GET_CATEGORY, 
  POST_CATEGORY, 
  DELETE_CATEGORY, 
  GET_CATEGORY_SUCCESS,
  POST_CATEGORY_SUCESS, 
  DELETE_CATEGORY_SUCCESS, 
  CATEGORY_FAIL 
} from './category-constants.store';
import { ICategories } from '../typing/state/categories';
import { actionTypes } from '../typing/action';

interface IAction {
  type: actionTypes,
  payload: ICategories
}

const initState: ICategories = {
  isLoading: false,
  isLoaded: false,
  items: [],
  error: null
}

const categoriesReducer = (state = initState, action: IAction) => {
  const newCategories = { ...state }

  switch (action.type) {
    case GET_CATEGORY || POST_CATEGORY || DELETE_CATEGORY:
      return {
        ...state,
        isLoading: true
      }

    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        items: action.payload
      }
    
    case POST_CATEGORY_SUCESS:
      newCategories.items.categories = [...state.items.categories, action.payload.CategoryId]
      return newCategories
    
    case DELETE_CATEGORY_SUCCESS:
      const deleteId = action.payload.CategoryId
      newCategories.items.categories = state.items.categories.filter(item => item._id !== deleteId)
      return newCategories
    
    case CATEGORY_FAIL:
      return {
        ...state,
        isLoaded: true,
        error: action.payload
      }
    default:
      return state || {}
  }
}

export default categoriesReducer
