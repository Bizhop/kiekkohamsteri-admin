export const RATING_REQUEST = "RATING_REQUEST"
export const RATING_SUCCESS = "RATING_SUCCESS"
export const RATING_FAILURE = "RATING_FAILURE"

export const getRating = pdga => ({
  type: RATING_REQUEST,
  pdga
})

export const ratingSuccess = response => ({
  type: RATING_SUCCESS,
  response
})

export const ratingError = error => ({
  type: RATING_FAILURE,
  error
})
