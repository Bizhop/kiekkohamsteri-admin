import { call, put, takeEvery } from "redux-saga/effects"
import R from "ramda"

import Api from "../Api"
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
  GET_USER_DETAILS,
  getUserDetails,
  UPDATE_ME,
  leadersSuccess,
  leadersError,
  LEADERS_REQUEST
} from "./userActions"
import { getOmat } from "../osto/ostoActions"

function* login(action) {
  try {
    const token = action.params.tokenId
    const response = yield call(Api.getRaw, "api/auth/login", {
      headers: {
        Authorization: token
      }
    })
    localStorage.setItem("hamsteri-token", token)
    localStorage.setItem("hamsteri-email", response.email)
    yield put(loginSuccess(response))
    yield put(getOmat())
  } catch (e) {
    yield put(loginError(e))
  }
}

function* getUserDetailsSaga() {
  try {
    const token = localStorage.getItem("hamsteri-token")
    const response = yield call(Api.getRaw, "api/auth/login", {
      headers: {
        Authorization: token
      }
    })
    localStorage.setItem("hamsteri-token", token)
    localStorage.setItem("hamsteri-email", response.email)
    yield put(loginSuccess(response))
  } catch (e) {
    yield put(loginError(e))
  }
}

function* getUsersSaga() {
  try {
    const response = yield call(Api.get, "api/user")
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
      R.pick(["username", "etunimi", "sukunimi", "pdga_num"], action.user)
    )
    yield put(getUsers())
  } catch (e) {
    yield put(updateUserError(e))
  }
}

function* updateMe(action) {
  try {
    yield call(
      Api.patch,
      `api/user/${action.user.id}`,
      R.pick(
        ["username", "etunimi", "sukunimi", "pdga_num", "publicDiscCount", "publicList"],
        action.user
      )
    )
    yield put(getUserDetails())
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

function* getLeadersSaga(action) {
  try {
    const response = yield call(Api.get, "api/user/leaders")
    yield put(leadersSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(leadersError(e))
    }
  }
}

function* userSaga() {
  yield [
    takeEvery(LOGIN_REQUEST, login),
    takeEvery(USERS_REQUEST, getUsersSaga),
    takeEvery(UPDATE_REQUEST, update),
    takeEvery(PROMOTE_USER, promoteUserSaga),
    takeEvery(DEMOTE_USER, demoteUserSaga),
    takeEvery(GET_USER_DETAILS, getUserDetailsSaga),
    takeEvery(UPDATE_ME, updateMe),
    takeEvery(LEADERS_REQUEST, getLeadersSaga)
  ]
}

export default userSaga
