import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './components/user/userReducer'
import moldReducer from './components/mold/moldReducer'
import dropdownReducer from './components/dropdown/dropdownReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  mold: moldReducer,
  dropdowns: dropdownReducer,
})

export default rootReducer
