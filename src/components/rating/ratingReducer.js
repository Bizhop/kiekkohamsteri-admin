import { RATING_SUCCESS, RATING_FAILURE, RATING_REQUEST } from "./ratingActions"

const initialState = {
  nextRating: null,
  error: null,
  fetching: false
}

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RATING_REQUEST:
      return {
        ...state,
        nextRating: null,
        error: null,
        fetching: true
      }
    case RATING_SUCCESS:
      return {
        ...state,
        nextRating: action.response.nextRating,
        error: null,
        fetching: false
      }
    case RATING_FAILURE:
      return {
        ...state,
        nextRating: null,
        error: "Tietojen haku ei onnistunut",
        fetching: false
      }
      return
    default:
      return state
  }
}

export default ratingReducer
