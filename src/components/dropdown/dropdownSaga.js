import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import { DROPDOWNS_REQUEST, dropdownsSuccess, dropdownsFailure } from './dropdownActions'

function* getDropdownsSaga() {
  try {
    const response = yield call(Api.get, 'api/dropdown')
    yield put(dropdownsSuccess(response))
  } catch (e) {
    yield put(dropdownsFailure(e))
  }
}

function* dropdownSaga() {
  yield takeEvery(DROPDOWNS_REQUEST, getDropdownsSaga)
}

export default dropdownSaga
