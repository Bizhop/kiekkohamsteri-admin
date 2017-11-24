import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import { loginSuccess, loginError, LOGIN_REQUEST } from './userActions'

function* login(action) {
  try {
    const token = action.params.tokenId
    const response = yield call(Api.get, 'api/auth/login', {
      headers: { Authorization: token },
    })
    localStorage.setItem('hamsteri-token', token)
    localStorage.setItem('hamsteri-email', response.email)
    yield put(
      loginSuccess({
        email: response.email,
        token,
      })
    )
  } catch (e) {
    yield put(loginError(e))
  }
}

function* userSaga() {
  yield takeEvery(LOGIN_REQUEST, login)
}

export default userSaga
