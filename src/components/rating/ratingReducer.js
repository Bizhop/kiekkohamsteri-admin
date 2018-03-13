import { RATING_SUCCESS, RATING_FAILURE } from "./ratingActions"

const initialState = {
  rounds: [],
  nextRating: null,
  error: null
}

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATING_SUCCESS:
      return {
        ...state,
        rounds: action.response.rounds,
        nextRating: action.response.nextRating,
        error: null
      }
    case RATING_FAILURE:
      return {
        ...state,
        rounds: [],
        error: "Tietojen haku ei onnistunut"
      }
      return
    default:
      return state
  }
}

export default ratingReducer
