import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import { KIEKOT_REQUEST, kiekotSuccess, kiekotError } from './kiekkoActions'
import { logout } from '../user/userActions'

function* getKiekotSaga() {
  try {
    const response = yield call(Api.get, 'api/kiekot', {
      params: {
        size: 1000,
        sort: 'id,asc',
      },
    })
    yield put(kiekotSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(kiekotError(e))
    }
  }
}

function* kiekkoSaga() {
  yield [takeEvery(KIEKOT_REQUEST, getKiekotSaga)]
}

export default kiekkoSaga
