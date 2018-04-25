import { call, put, takeEvery } from "redux-saga/effects"
import R from "ramda"

import Api from "../Api"
import {
  KIEKOT_REQUEST,
  kiekotSuccess,
  kiekotError,
  UPDATE_KIEKKO_REQUEST,
  getKiekot,
  updateKiekkoFailure,
  TOGGLE_KIEKKO_EDIT_MODAL,
  UPLOAD_IMAGE,
  uploadSuccess,
  uploadFailure,
  deleteKiekkoFailure,
  DELETE_DISC,
  APPLY_PREDICATES,
  filterKiekot,
  KIEKKO_REQUEST,
  kiekkoSuccess,
  kiekkoError,
  UPDATE_IMAGE,
  updateImageSuccess,
  updateImageFailure,
  CHOOSE_IMAGE,
  resizeComplete
} from "./kiekkoActions"
import { logout } from "../user/userActions"
import { getDropdownsByValmistaja } from "../dropdown/dropdownActions"
import { defaultSort } from "../shared/text"

const updateFields = [
  "valmId",
  "moldId",
  "muoviId",
  "variId",
  "kunto",
  "tussit",
  "paino",
  "muuta",
  "dyed",
  "hohto",
  "itb",
  "loytokiekko",
  "myynnissa",
  "spessu",
  "swirly",
  "hinta",
  "publicDisc"
]

const resizeOriginalImage = image =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = image.base64
    img.onload = function() {
      try {
        const ratio = this.naturalWidth / this.naturalHeight
        const width = ratio > 1 ? 600 : Math.round(600 / ratio)
        const height = Math.round(600 / ratio)

        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")

        ctx.drawImage(img, 0, 0, width, height)
        image.base64 = canvas.toDataURL("image/jpeg")
        resolve(image)
      } catch (e) {
        reject(e)
      }
    }
  })

function* getKiekotSaga(action) {
  try {
    const response = yield call(Api.get, `api/kiekot?size=1000&sort=${action.params.sort}`)
    yield put(
      kiekotSuccess({
        kiekot: response.content,
        newSortColumn: action.params.newSortColumn
      })
    )
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(kiekotError(e))
    }
  }
}

function* getKiekkoSaga(action) {
  try {
    const response = yield call(Api.get, `api/kiekot/${action.id}`)
    yield put(kiekkoSuccess(response))
  } catch (e) {
    yield put(kiekkoError(e))
  }
}

function* updateKiekkoSaga(action) {
  try {
    yield call(Api.put, `api/kiekot/${action.kiekko.id}`, R.pick(updateFields, action.kiekko))
    yield put(getKiekot(defaultSort))
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

function* uploadImageSaga(action) {
  try {
    const response = yield call(Api.post, "api/kiekot", {
      name: "",
      data: action.data
    })
    yield put(uploadSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(uploadFailure(e))
    }
  }
}

function* deleteDiscSaga(action) {
  try {
    yield call(Api.delete, `api/kiekot/${action.id}`)
    yield put(getKiekot(defaultSort))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(deleteKiekkoFailure(e))
    }
  }
}

function* applyPredicatesSaga() {
  yield put(filterKiekot())
}

function* updateImageSaga(action) {
  try {
    yield call(Api.patch, `api/kiekot/${action.params.id}/update-image`, {
      name: "",
      data: action.params.image
    })
    yield put(getKiekot(defaultSort))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(updateImageFailure(e))
    }
  }
}

function* resizeImageSaga(action) {
  try {
    const resized = yield call(resizeOriginalImage, action.image)
    yield put(resizeComplete(resized))
  } catch (e) {
    console.log(e)
  }
}

function* kiekkoSaga() {
  yield [
    takeEvery(KIEKOT_REQUEST, getKiekotSaga),
    takeEvery(UPDATE_KIEKKO_REQUEST, updateKiekkoSaga),
    takeEvery(TOGGLE_KIEKKO_EDIT_MODAL, toggleEditModalSaga),
    takeEvery(UPLOAD_IMAGE, uploadImageSaga),
    takeEvery(DELETE_DISC, deleteDiscSaga),
    takeEvery(APPLY_PREDICATES, applyPredicatesSaga),
    takeEvery(KIEKKO_REQUEST, getKiekkoSaga),
    takeEvery(UPDATE_IMAGE, updateImageSaga),
    takeEvery(CHOOSE_IMAGE, resizeImageSaga)
  ]
}

export default kiekkoSaga
