import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import { getUsers } from '../user/userActions'

const UserContainer = () => <div>Käyttäjät</div>

const mapStateToProps = state => ({
  loggedIn: R.path(['user', 'users'], state),
})

const mapDispatchToProps = dispatch => ({
  getUsers: dispatch(getUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
