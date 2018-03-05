import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import GoogleLogin from "react-google-login"

import { login, loginError, toggleEditModal, requestUpdateMe } from "../user/userActions"
import UserEditModal from "../user/UserEditModal"

const DashContainer = props => (
  <div className="container">
    <UserEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      user={props.userInEdit}
      editUser={props.editUser}
      label="Muokkaa tietojasi"
    />
    {props.loggedIn ? (
      props.user && (
        <div>
          <h1>Tervetuloa {props.user.username}!</h1>
          <div className="row">
            <div className="col-md-2">Nimi</div>
            <div className="col-md-5">
              {props.user.etunimi} {props.user.sukunimi}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">Email</div>
            <div className="col-md-5">{props.user.email}</div>
          </div>
          <div className="row">
            <div className="col-md-2">PDGA numero</div>
            <div className="col-md-5">{props.user.pdga_num}</div>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => props.toggleEditModal(props.user)}>
              Muokkaa
            </button>
          </div>
        </div>
      )
    ) : (
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
  user: R.path(["user", "user"], state),
  error: R.path(["user", "error"], state),
  isEditOpen: R.path(["user", "isEditModalOpen"], state),
  userInEdit: R.path(["user", "userInEdit"], state)
})

const mapDispatchToProps = dispatch => ({
  login: response => dispatch(login(response)),
  loginError: response => dispatch(loginError(response)),
  toggleEditModal: user => dispatch(toggleEditModal(user)),
  editUser: user => dispatch(requestUpdateMe(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)
