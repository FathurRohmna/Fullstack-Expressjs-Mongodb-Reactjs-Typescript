import { connect } from 'react-redux'
import { compose } from 'redux'
import { postCategories, getCategories, deleteCategory } from '../store/category-actions.store'
import { isCategoryLoading, isCategoryLoaded, categories } from '../selector'
import { ICategories } from '../typing/state'
import { Categories, Props } from './categories'

const mapStateToProps = (state: ICategories) => ({
  categoriesLoaded: isCategoryLoading(state),
  error: isCategoryLoaded(state),
  categories: categories(state),
})

const actions = {
  getCategories,
  submitData: postCategories,
  deleteCategory
}

export default compose<Props, {}>(
  connect(mapStateToProps, actions)
)(Categories)
