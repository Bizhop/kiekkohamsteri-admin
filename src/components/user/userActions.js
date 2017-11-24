export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'
export const TOGGLE_EDIT_MODAL = 'TOGGLE_EDIT_MODAL'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'
export const LOGOUT = 'LOGOUT'

export const login = params => ({
  type: LOGIN_REQUEST,
  params,
})

export const loginSuccess = params => ({
  type: LOGIN_SUCCESS,
  token: params.token,
  email: params.email,
})

export const loginError = error => ({
  type: LOGIN_FAILURE,
  error,
})

export const logout = () => ({
  type: LOGOUT,
})

export const getUsers = () => ({
  type: USERS_REQUEST,
})

export const usersSuccess = users => ({
  type: USERS_SUCCESS,
  users,
})

export const usersError = error => ({
  type: USERS_FAILURE,
  error,
})

export const toggleEditModal = user => ({
  type: TOGGLE_EDIT_MODAL,
  user,
})

export const requestUpdateUser = user => ({
  type: UPDATE_REQUEST,
  user,
})

export const updateUserError = error => ({
  type: UPDATE_FAILURE,
  error,
})
