export const KIEKOT_REQUEST = "KIEKOT_REQUEST"
export const KIEKOT_SUCCESS = "KIEKOT_SUCCESS"
export const KIEKOT_FAILURE = "KIEKOT_FAILURE"
export const TOGGLE_KIEKKO_EDIT_MODAL = "TOGGLE_KIEKKO_EDIT_MODAL"
export const UPDATE_KIEKKO_REQUEST = "UPDATE_KIEKKO_REQUEST"
export const UPDATE_KIEKKO_FAILURE = "UPDATE_KIEKKO_FAILURE"
export const CHOOSE_IMAGE = "CHOOSE_IMAGE"
export const UPLOAD_IMAGE = "UPLOAD_IMAGE"
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS"
export const UPLOAD_FAILURE = "UPLOAD_FAILURE"
export const DELETE_DISC = "DELETE_DISC"
export const DELETE_DISC_FAILURE = "DELETE_DISC_FAILURE"
export const APPLY_PREDICATES = "APPLY_PREDICATES"
export const FILTER_KIEKOT = "FILTER_KIEKOT"

export const getKiekot = params => ({
  type: KIEKOT_REQUEST,
  params
})

export const kiekotSuccess = params => ({
  type: KIEKOT_SUCCESS,
  params
})

export const kiekotError = error => ({
  type: KIEKOT_FAILURE,
  error
})

export const updateDisc = kiekko => ({
  type: UPDATE_KIEKKO_REQUEST,
  kiekko
})

export const updateKiekkoFailure = error => ({
  type: UPDATE_KIEKKO_FAILURE,
  error
})

export const toggleEditModal = kiekko => ({
  type: TOGGLE_KIEKKO_EDIT_MODAL,
  kiekko
})

export const chooseImage = image => ({
  type: CHOOSE_IMAGE,
  image
})

export const uploadImage = data => ({
  type: UPLOAD_IMAGE,
  data
})

export const uploadSuccess = response => ({
  type: UPLOAD_SUCCESS,
  response
})

export const uploadFailure = error => ({
  type: UPLOAD_FAILURE,
  error
})

export const deleteDisc = id => ({
  type: DELETE_DISC,
  id
})

export const deleteDiscFailure = error => ({
  type: DELETE_DISC_FAILURE,
  error
})

export const applyPredicates = form => ({
  type: APPLY_PREDICATES,
  form
})

export const filterKiekot = () => ({
  type: FILTER_KIEKOT
})
