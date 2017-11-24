import { fork } from 'redux-saga/effects'

import userSaga from './components/user/userSaga'
import moldSaga from './components/mold/moldSaga'

function* rootSaga() {
  yield [fork(userSaga), fork(moldSaga)]
}

export default rootSaga
