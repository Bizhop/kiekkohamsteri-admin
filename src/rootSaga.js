import { fork } from "redux-saga/effects"

import userSaga from "./components/user/userSaga"
import moldSaga from "./components/mold/moldSaga"
import dropdownSaga from "./components/dropdown/dropdownSaga"
import muoviSaga from "./components/muovi/muoviSaga"
import kiekkoSaga from "./components/kiekko/kiekkoSaga"
import myytavatSaga from "./components/myytavat/myytavatSaga"
import ratingSaga from "./components/rating/ratingSaga"

function* rootSaga() {
  yield [
    fork(userSaga),
    fork(moldSaga),
    fork(dropdownSaga),
    fork(muoviSaga),
    fork(kiekkoSaga),
    fork(myytavatSaga),
    fork(ratingSaga)
  ]
}

export default rootSaga
