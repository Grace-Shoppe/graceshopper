import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div>
      <h1>{displayName}</h1>
      <form id="submitForm" onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="Name">
            <small>Name</small>
          </label>
          <input name="Name" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {name === 'signup' && (
          <div>
            <label htmlFor="confirmationPassword">
              <small>Confirmation password</small>
            </label>
            <input name="confirmationPassword" type="password" />
          </div>
        )}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
      <div className="modal-body" id="modal-body">
        You're logged in!
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      const name = evt.target.Name.value
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      evt.preventDefault()
      // let x = document.getElementById('modal-body')
      // x.className = 'show'
      // setTimeout(function() {
      //   x.className = x.className.replace('show', '')
      // }, 4000)
      if (formName === 'signup') {
        if (
          evt.target.password.value !== event.target.confirmationPassword.value
        ) {
          alert('WARNING: THE CONFIRMATION PASSWORD IS WRONG')
        }
      }
      dispatch(auth(name, email, password, formName))
      history.push('/products')
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
