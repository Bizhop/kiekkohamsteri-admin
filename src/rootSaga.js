import { fork } from 'redux-saga/effects'

import userSaga from './components/user/userSaga'
import moldSaga from './components/mold/moldSaga'
import dropdownSaga from './components/dropdown/dropdownSaga'
import muoviSaga from './components/muovi/muoviSaga'

function* rootSaga() {
  yield [fork(userSaga), fork(moldSaga), fork(dropdownSaga), fork(muoviSaga)]
}

export default rootSaga
