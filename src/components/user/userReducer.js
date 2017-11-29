import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USERS_SUCCESS,
  USERS_FAILURE,
  TOGGLE_EDIT_MODAL,
  UPDATE_FAILURE,
  LOGOUT,
} from './userActions'

const initialState = {
  token: localStorage.getItem('hamsteri-token'),
  email: localStorage.getItem('hamsteri-email'),
  users: [],
  error: null,
  isEditModalOpen: false,
  userInEdit: {},
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
        error: null,
      }
    case USERS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        isEditModalOpen: false,
      }
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
        userInEdit: action.user,
      }
    case UPDATE_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case LOGOUT:
      localStorage.removeItem('hamsteri-token')
      localStorage.removeItem('hamsteri-email')
      return {
        ...state,
        token: null,
        email: null,
      }
    default:
      return state
  }
}

export default userReducer
