import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { actions as authActions } from '../../redux/modules/auth'
import LoginForm from 'forms/LoginForm'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  expired: state.auth.expired
})

const handleSubmit = (values, dispatch) => {
  return dispatch(authActions.login(values)).then(
    () => {
      dispatch(routeActions.push('/'))
    })
}

export class LoginView extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    expired: PropTypes.bool.isRequired
  };

  render () {
    return (
      <div>
          <LoginForm onSubmit={handleSubmit} expired={this.props.expired} />
      </div>
    )
  }
}
export default connect(mapStateToProps, authActions)(LoginView)
