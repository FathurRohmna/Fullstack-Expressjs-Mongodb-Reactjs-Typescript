import { getUsers, editUser, deleteUser } from './../store/user-actions.store';
import { isUsersLoaded, isUsersError, users } from './../selector/index';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IUsers } from '../typing/state';
import { Users } from './users'

const mapStateToProps = (state: IUsers) => ({
  isLoaded: isUsersLoaded(state),
  error: isUsersError(state),
  users: users(state)
})

const actions = {
  getUsers,
  editUser,
  deleteUser
}

export default compose<Props, {}>(
  connect(mapStateToProps, actions)
)(Users)