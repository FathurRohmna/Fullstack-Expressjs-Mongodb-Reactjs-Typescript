import { usersData, userLength, users } from './../users/selector/index';
import { getArticle } from './../article/store/article-actions.store';
import { getCategories } from './../category/store/category-actions.store';
import { getUsers, getUsersData } from './../users/store/user-actions.store';
import { connect } from 'react-redux'
import { compose } from 'redux'

import { categories } from '../category/selector'
import { articles } from '../article/selector'
import { Dashboard } from './dashboard'

const mapStateToProps = (state: any) => ({
  users: users(state),
  usersLength: userLength(state),
  usersData: usersData(state),
  categories: categories(state),
  articles: articles(state),
})

const actions = {
  getUsers,
  getArticle,
  getCategories,
  getUsersData
}

export default compose(
  connect(mapStateToProps, actions)
)(Dashboard)
