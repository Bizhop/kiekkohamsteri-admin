export const MOLDS_REQUEST = 'MOLDS_REQUEST'
export const MOLDS_SUCCESS = 'MOLDS_SUCCESS'
export const MOLDS_FAILURE = 'MOLDS_FAILURE'

export const getMolds = () => ({
  type: MOLDS_REQUEST,
})

export const moldsSuccess = molds => ({
  type: MOLDS_SUCCESS,
  molds,
})

export const moldsFailure = error => ({
  type: MOLDS_FAILURE,
  error,
})
