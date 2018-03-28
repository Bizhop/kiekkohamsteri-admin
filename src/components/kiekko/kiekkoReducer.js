import R from "ramda"

import {
  KIEKOT_SUCCESS,
  TOGGLE_KIEKKO_EDIT_MODAL,
  CHOOSE_IMAGE,
  UPLOAD_SUCCESS,
  APPLY_PREDICATES,
  FILTER_KIEKOT
} from "./kiekkoActions"

const initialState = {
  kiekot: [],
  kiekotFiltered: [],
  isEditOpen: false,
  kiekkoInEdit: null,
  image: null,
  sortColumn: "Id",
  predicates: null
}

const kiekkoReducer = (state = initialState, action) => {
  switch (action.type) {
    case KIEKOT_SUCCESS:
      return {
        ...state,
        kiekot: action.params.kiekot,
        kiekotFiltered:
          state.predicates === null
            ? action.params.kiekot
            : R.filter(R.allPass(state.predicates), action.params.kiekot),
        sortColumn: action.params.newSortColumn,
        isEditOpen: false,
        kiekkoInEdit: null,
        image: null
      }
    case TOGGLE_KIEKKO_EDIT_MODAL:
      return {
        ...state,
        isEditOpen: !state.isEditOpen,
        kiekkoInEdit: action.kiekko
      }
    case CHOOSE_IMAGE:
      return {
        ...state,
        image: action.image
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        kiekkoInEdit: action.response,
        isEditOpen: true,
        image: null
      }
    case APPLY_PREDICATES:
      return {
        ...state,
        predicates: R.keys(R.filter(n => n, action.form)).map(p => d => R.prop(p, d))
      }
    case FILTER_KIEKOT:
      return {
        ...state,
        kiekotFiltered: R.filter(R.allPass(state.predicates), state.kiekot)
      }
    default:
      return state
  }
}

export default kiekkoReducer
