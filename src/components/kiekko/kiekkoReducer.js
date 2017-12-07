import { KIEKOT_SUCCESS } from './kiekkoActions'

const initialState = {
  kiekot: {
    content: [],
  },
}

const kiekkoReducer = (state = initialState, action) => {
  switch (action.type) {
    case KIEKOT_SUCCESS:
      return {
        ...state,
        kiekot: action.kiekot,
      }
    default:
      return state
  }
}

export default kiekkoReducer
