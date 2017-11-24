import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'

import { login } from '../user/userActions'

const responseGoogle = response => {
  console.log(response)
}

const DashContainer = props => (
  <div className="container">
    {!props.loggedIn && (
      <GoogleLogin
        clientId="107543052765-lfgp4lke6h51a0l4kp258anilpeegf8v.apps.googleusercontent.com"
        buttonText="Kirjaudu sisään"
        className="btn btn-danger"
        onSuccess={props.login}
        onFailure={responseGoogle}
      />
    )}
    {props.error && (
      <div>
        <h1>{props.error}</h1>
      </div>
    )}
  </div>
)

const mapStateToProps = state => ({
  loggedIn: R.path(['user', 'token'], state),
  error: R.path(['user', 'error'], state),
})

const mapDispatchToProps = dispatch => ({
  login: response => dispatch(login(response)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)
