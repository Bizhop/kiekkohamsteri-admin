import { MOLDS_REQUEST, MOLDS_SUCCESS, MOLDS_FAILURE } from './moldActions'

const initialState = {
  molds: [],
}

const moldsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOLDS_REQUEST:
      return {
        ...state,
      }
    case MOLDS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case MOLDS_SUCCESS:
      return {
        ...state,
        molds: action.molds,
      }
    default:
      return state
  }
}

export default moldsReducer
