import { KIEKOT_SUCCESS, TOGGLE_KIEKKO_EDIT_MODAL } from './kiekkoActions'

const initialState = {
  kiekot: {
    content: [],
  },
  isEditOpen: false,
  kiekkoInEdit: null,
}

const kiekkoReducer = (state = initialState, action) => {
  switch (action.type) {
    case KIEKOT_SUCCESS:
      return {
        ...state,
        kiekot: action.kiekot,
        isEditOpen: false,
        kiekkoInEdit: null,
      }
    case TOGGLE_KIEKKO_EDIT_MODAL:
      return {
        ...state,
        isEditOpen: !state.isEditOpen,
        kiekkoInEdit: action.kiekko,
      }
    default:
      return state
  }
}

export default kiekkoReducer
