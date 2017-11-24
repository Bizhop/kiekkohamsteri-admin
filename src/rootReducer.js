import { combineReducers } from 'redux'

import userReducer from './components/user/userReducer'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
