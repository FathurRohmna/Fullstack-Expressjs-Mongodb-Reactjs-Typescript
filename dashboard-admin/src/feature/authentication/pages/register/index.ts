import { IAuthentication } from './../../typing/state/authentication.interface';
import { userRegister } from './../../store/actions.store';
import { isAuthLoaded, authError } from './../../selector/index';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Register, Props } from './register'

const mapStateToProps = (state: IAuthentication) => ({
  processLoading: isAuthLoaded(state),
  error: authError(state)
})

const actions = {
  submitData: userRegister
}

export default compose<Props, {}>(
  connect(mapStateToProps, actions)
)(Register)
