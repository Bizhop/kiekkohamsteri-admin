export const KIEKOT_REQUEST = 'KIEKOT_REQUEST'
export const KIEKOT_SUCCESS = 'KIEKOT_SUCCESS'
export const KIEKOT_FAILURE = 'KIEKOT_FAILURE'
export const TOGGLE_KIEKKO_EDIT_MODAL = 'TOGGLE_KIEKKO_EDIT_MODAL'
export const UPDATE_KIEKKO_REQUEST = 'UPDATE_KIEKKO_REQUEST'
export const UPDATE_KIEKKO_FAILURE = 'UPDATE_KIEKKO_FAILURE'

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

export const updateDisc = kiekko => ({
  type: UPDATE_KIEKKO_REQUEST,
  kiekko,
})

export const updateKiekkoFailure = error => ({
  type: UPDATE_KIEKKO_FAILURE,
  error,
})

export const toggleEditModal = kiekko => ({
  type: TOGGLE_KIEKKO_EDIT_MODAL,
  kiekko,
})
