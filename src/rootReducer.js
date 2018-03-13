import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"

import kiekkoReducer from "./components/kiekko/kiekkoReducer"
import userReducer from "./components/user/userReducer"
import moldReducer from "./components/mold/moldReducer"
import dropdownReducer from "./components/dropdown/dropdownReducer"
import muoviReducer from "./components/muovi/muoviReducer"
import myytavatReducer from "./components/myytavat/myytavatReducer"
import ratingReducer from "./components/rating/ratingReducer"

const rootReducer = combineReducers({
  form: formReducer,
  kiekko: kiekkoReducer,
  user: userReducer,
  mold: moldReducer,
  muovi: muoviReducer,
  dropdowns: dropdownReducer,
  myytavat: myytavatReducer,
  rating: ratingReducer
})

export default rootReducer
