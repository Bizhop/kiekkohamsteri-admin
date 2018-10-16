import { RATING_SUCCESS, RATING_FAILURE, RATING_REQUEST } from "./ratingActions"

const initialState = {
  rounds: [],
  nextRating: null,
  customRating: null,
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
        fetching: true,
        rounds: []
      }
    case RATING_SUCCESS:
      return {
        ...state,
        nextRating: action.response.nextRating,
        rounds: action.response.rounds,
        error: null,
        fetching: false
      }
    case RATING_FAILURE:
      return {
        ...state,
        nextRating: null,
        rounds: [],
        customRating: null,
        error: "Tietojen haku ei onnistunut",
        fetching: false
      }
    default:
      return state
  }
}

export default ratingReducer
