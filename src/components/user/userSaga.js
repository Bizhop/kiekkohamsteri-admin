import { call, put, takeEvery } from 'redux-saga/effects'
import R from 'ramda'

import Api from '../Api'
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginError,
  USERS_REQUEST,
  usersSuccess,
  usersError,
  UPDATE_REQUEST,
  updateUserError,
  getUsers,
  logout,
  PROMOTE_USER,
  DEMOTE_USER,
} from './userActions'

function* login(action) {
  try {
    const token = action.params.tokenId
    const response = yield call(Api.getRaw, 'api/auth/login', {
      headers: {
        Authorization: token,
      },
    })
    if (response.level === 2) {
      localStorage.setItem('hamsteri-token', token)
      localStorage.setItem('hamsteri-email', response.email)
      yield put(
        loginSuccess({
          email: response.email,
          token,
        }),
      )
    } else {
      yield put(loginError('Unauthorized'))
    }
  } catch (e) {
    yield put(loginError(e))
  }
}

function* getUsersSaga() {
  try {
    const response = yield call(Api.get, 'api/user')
    yield put(usersSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(usersError(e))
    }
  }
}

function* update(action) {
  try {
    yield call(
      Api.patch,
      `api/user/${action.user.id}`,
      R.pick(['username', 'etunimi', 'sukunimi', 'pdga_num'], action.user),
    )
    yield put(getUsers())
  } catch (e) {
    yield put(updateUserError(e))
  }
}

function* promoteUserSaga(action) {
  try {
    yield call(Api.patch, `api/user/${action.userId}/level/2`)
    yield put(getUsers())
  } catch (e) {
    yield put(updateUserError(e))
  }
}

function* demoteUserSaga(action) {
  try {
    yield call(Api.patch, `api/user/${action.userId}/level/1`)
    yield put(getUsers())
  } catch (e) {
    yield put(updateUserError(e))
  }
}

function* userSaga() {
  yield [
    takeEvery(LOGIN_REQUEST, login),
    takeEvery(USERS_REQUEST, getUsersSaga),
    takeEvery(UPDATE_REQUEST, update),
    takeEvery(PROMOTE_USER, promoteUserSaga),
    takeEvery(DEMOTE_USER, demoteUserSaga),
  ]
}

export default userSaga
