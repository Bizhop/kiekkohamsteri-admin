import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './components/user/userReducer'
import moldReducer from './components/mold/moldReducer'
import dropdownReducer from './components/dropdown/dropdownReducer'
import muoviReducer from './components/muovi/muoviReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  mold: moldReducer,
  muovi: muoviReducer,
  dropdowns: dropdownReducer,
})

export default rootReducer
