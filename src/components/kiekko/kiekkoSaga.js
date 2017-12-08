import { call, put, takeEvery } from 'redux-saga/effects'
import R from 'ramda'

import Api from '../Api'
import {
  KIEKOT_REQUEST,
  kiekotSuccess,
  kiekotError,
  UPDATE_KIEKKO_REQUEST,
  getKiekot,
  updateKiekkoFailure,
  TOGGLE_KIEKKO_EDIT_MODAL,
} from './kiekkoActions'
import { logout } from '../user/userActions'
import { getDropdownsByValmistaja } from '../dropdown/dropdownActions'

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

function* updateKiekkoSaga(action) {
  try {
    yield call(
      Api.put,
      `api/kiekot/${action.kiekko.id}`,
      R.pick(['valmId', 'moldId', 'muoviId', 'variId', 'paino', 'muuta'], action.kiekko),
    )
    yield put(getKiekot())
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(updateKiekkoFailure(e))
    }
  }
}

function* toggleEditModalSaga(action) {
  if (action.kiekko) {
    yield put(getDropdownsByValmistaja(action.kiekko.valmId))
  }
}

function* kiekkoSaga() {
  yield [
    takeEvery(KIEKOT_REQUEST, getKiekotSaga),
    takeEvery(UPDATE_KIEKKO_REQUEST, updateKiekkoSaga),
    takeEvery(TOGGLE_KIEKKO_EDIT_MODAL, toggleEditModalSaga),
  ]
}

export default kiekkoSaga