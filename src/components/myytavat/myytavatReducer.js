import { MYYTAVAT_SUCCESS } from "./myytavatActions"

const initialState = {
  kiekot: {
    content: []
  }
}

const myytavatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MYYTAVAT_SUCCESS:
      return {
        ...state,
        kiekot: action.myytavat
      }
    default:
      return state
  }
}

export default myytavatReducer
