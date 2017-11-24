import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import { MOLDS_REQUEST, moldsSuccess, moldsFailure } from './moldActions'

function* getMoldsSaga() {
  try {
    const response = yield call(Api.get, 'api/molds')
    yield put(moldsSuccess(response))
  } catch (e) {
    yield put(moldsFailure(e))
  }
}

function* moldSaga() {
  yield takeEvery(MOLDS_REQUEST, getMoldsSaga)
}

export default moldSaga
