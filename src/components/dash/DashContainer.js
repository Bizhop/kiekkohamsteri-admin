import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import GoogleLogin from "react-google-login"

import { login, loginError, toggleEditModal, requestUpdateMe } from "../user/userActions"
import { getOmat, peruutaOsto, hyvaksyOsto } from "../osto/ostoActions"
import UserEditModal from "../user/UserEditModal"
import OstoTable from "./OstoTable"
import MyyntiTable from "./MyyntiTable"

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
          <h1>Omat ostot</h1>
          {props.kaupat && (
            <OstoTable
              ostot={props.kaupat.ostajana}
              action={{ action: props.peruuta, label: "Peruuta" }}
            />
          )}
          <h1>Omat myynnit</h1>
          {props.kaupat && (
            <MyyntiTable
              ostot={props.kaupat.myyjana}
              accept={{ action: props.accept, label: "Hyväksy" }}
              cancel={{ action: props.peruuta, label: "Peruuta" }}
            />
          )}
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
  userInEdit: R.path(["user", "userInEdit"], state),
  kaupat: R.path(["osto", "data"], state)
})

const mapDispatchToProps = dispatch => ({
  ostot: dispatch(getOmat()),
  accept: id => dispatch(hyvaksyOsto(id)),
  peruuta: id => dispatch(peruutaOsto(id)),
  login: response => dispatch(login(response)),
  loginError: response => dispatch(loginError(response)),
  toggleEditModal: user => dispatch(toggleEditModal(user)),
  editUser: user => dispatch(requestUpdateMe(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)
