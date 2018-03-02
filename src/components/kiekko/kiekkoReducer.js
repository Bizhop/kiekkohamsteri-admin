import {
  KIEKOT_SUCCESS,
  TOGGLE_KIEKKO_EDIT_MODAL,
  CHOOSE_IMAGE,
  UPLOAD_SUCCESS
} from "./kiekkoActions"

const initialState = {
  kiekot: [],
  isEditOpen: false,
  kiekkoInEdit: null,
  image: null,
  sortColumn: "Id"
}

const kiekkoReducer = (state = initialState, action) => {
  switch (action.type) {
    case KIEKOT_SUCCESS:
      return {
        ...state,
        kiekot: action.params.kiekot,
        sortColumn: action.params.newSortColumn,
        isEditOpen: false,
        kiekkoInEdit: null
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
    default:
      return state
  }
}

export default kiekkoReducer
