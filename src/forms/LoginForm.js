import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import loginValidation from './loginValidation'

const fields = ['username', 'password']

class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    expired: PropTypes.bool.isRequired
  };

  render () {
    const {fields: {username, password}, error, expired, handleSubmit, submitting} = this.props
    return (
      <div>
          <div className='row'>
              <div className='col-md-4 col-md-offset-4'>
                  <h1>Sign in</h1>
                  {error &&
                    <div className='alert alert-danger'>
                        <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </div>}
                    {expired &&
                      <div className='alert alert-warning'>
                          <strong>Your credentials have expired.</strong> Please enter your credentials and try again.
                      </div>}
              </div>
              <div className='col-md-4 col-md-offset-4'>
                  <form onSubmit={handleSubmit} className='form' role='form'>
                      <div className='form-group'>
                          <label htmlFor='username'>Login</label>
                          <input type='text' className='form-control' id='username'
                            placeholder='Username' {...username} />
                          {username.touched && username.error && <div>{username.error}</div>}
                      </div>
                      <div className='form-group'>
                          <label htmlFor='password'>Password</label>
                          <input type='password' className='form-control' id='password'
                             placeholder='Password' {...password} />
                          {password.touched && password.error && <div>{password.error}</div>}
                      </div>
                      <button type='submit' className='btn btn-primary' disabled={submitting}>
                        {submitting ? <span className='glyphicon glyphicon-refresh spin'></span>
                          : <span className='glyphicon glyphicon-refresh spin'></span>} Log In
                      </button>
                  </form>
                  <p></p>
              </div>
          </div>
      </div>

    )
  }
}

export default reduxForm({
  form: 'loginForm',
  fields,
  validate: loginValidation
})(LoginForm)
