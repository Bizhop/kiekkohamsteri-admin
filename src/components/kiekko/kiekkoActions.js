export const KIEKOT_REQUEST = 'KIEKOT_REQUEST'
export const KIEKOT_SUCCESS = 'KIEKOT_SUCCESS'
export const KIEKOT_FAILURE = 'KIEKOT_FAILURE'

export const getKiekot = () => ({
  type: KIEKOT_REQUEST,
})

export const kiekotSuccess = kiekot => ({
  type: KIEKOT_SUCCESS,
  kiekot,
})

export const kiekotError = error => ({
  type: KIEKOT_FAILURE,
  error,
})
