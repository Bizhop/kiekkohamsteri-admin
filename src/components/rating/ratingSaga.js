import { call, put, takeEvery } from "redux-saga/effects"

import Api from "../Api"
import { RATING_REQUEST, ratingSuccess, ratingError } from "./ratingActions"

function* getRatingSaga(action) {
  try {
    const response = yield call(Api.get, `api/rating/${action.pdga}/rounds`)
    yield put(ratingSuccess(response))
  } catch (e) {
    yield put(ratingError(e))
  }
}

function* ratingSaga() {
  yield [takeEvery(RATING_REQUEST, getRatingSaga)]
}

export default ratingSaga
