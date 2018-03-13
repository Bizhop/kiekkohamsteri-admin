import { RATING_SUCCESS } from "./ratingActions"

const initialState = {
  rounds: []
}

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATING_SUCCESS:
      return {
        ...state,
        rounds: action.response
      }
    default:
      return state
  }
}

export default ratingReducer
