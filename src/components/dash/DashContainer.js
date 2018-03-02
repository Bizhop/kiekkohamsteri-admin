import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import GoogleLogin from "react-google-login"

import { login, loginError } from "../user/userActions"

const DashContainer = props => (
  <div className="container">
    {!props.loggedIn && (
      <GoogleLogin
        clientId="107543052765-lfgp4lke6h51a0l4kp258anilpeegf8v.apps.googleusercontent.com"
        buttonText="Kirjaudu sisään"
        className="btn btn-danger"
        onSuccess={props.login}
        onFailure={props.loginError}
      />
    )}
    {props.error && console.log(props.error)}
  </div>
)

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  error: R.path(["user", "error"], state)
})

const mapDispatchToProps = dispatch => ({
  login: response => dispatch(login(response)),
  loginError: response => dispatch(loginError(response))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)
