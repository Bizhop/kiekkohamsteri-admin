import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './userActions'

const initialState = {
  token: localStorage.getItem('hamsteri-token'),
  email: localStorage.getItem('hamsteri-email'),
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
      }
    case LOGOUT:
      localStorage.removeItem('hamsteri-token')
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}

export default userReducer
