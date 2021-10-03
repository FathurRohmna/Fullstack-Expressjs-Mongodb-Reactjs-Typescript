import { IAuthentication } from './../../typing/state/authentication.interface';
import { userLogin } from '../../store/actions.store';
import { Login, Props } from './login';
import { isAuthLoading, isAuthLoaded, authError } from '../../selector';
import { compose } from 'recompose'
import { connect } from 'react-redux'

const mapStateToProps = (state: IAuthentication) => ({
  processLoading: isAuthLoading(state),
  loginLoaded: isAuthLoaded(state),
  error: authError(state)
})

const actions = {
  submitData: userLogin,
}

export default compose<Props, {}>(
  connect(mapStateToProps, actions) 
)(Login)
