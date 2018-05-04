import R from "ramda"

import {
  KIEKOT_SUCCESS,
  TOGGLE_KIEKKO_EDIT_MODAL,
  CHOOSE_IMAGE,
  UPLOAD_SUCCESS,
  APPLY_PREDICATES,
  FILTER_KIEKOT,
  KIEKKO_SUCCESS,
  KIEKOT_REQUEST,
  KIEKKO_REQUEST,
  KIEKKO_FAILURE,
  UPDATE_CROP,
  COMPLETE_CROP,
  UPDATE_IMAGE_SUCCESS,
  JULKISET_SUCCESS,
  JULKISET_LAAJENNA,
  JULKISET_REQUEST,
  JULKISET_SUPISTA
} from "./kiekkoActions"
import { defaultSort } from "../shared/text"

const initialState = {
  kiekot: [],
  kiekko: null,
  kiekotFiltered: [],
  isEditOpen: false,
  kiekkoInEdit: null,
  image: null,
  sortColumn: defaultSort.newSortColumn,
  predicates: null,
  oneDiscText: "",
  crop: {
    aspect: 1
  },
  croppedImage: null,
  pixelCrop: {
    widht: "",
    height: ""
  },
  julkiset: [],
  julkisetVisible: []
}

const processCrop = (pixelCrop, base64) => {
  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")

  var image = new Image()
  image.src = base64

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return canvas.toDataURL("image/jpeg")
}

const kiekkoReducer = (state = initialState, action) => {
  switch (action.type) {
    case KIEKOT_REQUEST:
      return {
        ...state,
        kiekot: [],
        kiekotFiltered: []
      }
    case KIEKOT_SUCCESS:
      return {
        ...state,
        kiekot: action.params.kiekot,
        kiekotFiltered:
          state.predicates === null
            ? action.params.kiekot
            : R.filter(R.allPass(state.predicates), action.params.kiekot),
        sortColumn: action.params.newSortColumn,
        isEditOpen: false,
        kiekkoInEdit: null,
        image: null,
        crop: {
          aspect: 1
        },
        croppedImage: null
      }
    case KIEKKO_REQUEST:
      return {
        ...state,
        kiekko: null,
        oneDiscText: "Haetaan..."
      }
    case KIEKKO_SUCCESS:
      return {
        ...state,
        kiekko: action.kiekko,
        oneDiscText: ""
      }
    case KIEKKO_FAILURE:
      return {
        ...state,
        kiekko: null,
        oneDiscText: "Ei saatavilla"
      }
    case TOGGLE_KIEKKO_EDIT_MODAL:
      return {
        ...state,
        isEditOpen: !state.isEditOpen,
        kiekkoInEdit: action.kiekko
      }
    case CHOOSE_IMAGE:
      return {
        ...state,
        image: action.image
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        kiekkoInEdit: action.response,
        isEditOpen: true,
        image: null
      }
    case APPLY_PREDICATES:
      return {
        ...state,
        predicates: R.keys(R.filter(n => n, action.form)).map(p => d => R.prop(p, d))
      }
    case FILTER_KIEKOT:
      return {
        ...state,
        kiekotFiltered: R.filter(R.allPass(state.predicates), state.kiekot)
      }
    case UPDATE_CROP:
      return {
        ...state,
        crop: action.crop,
        pixelCrop: {
          widht: "",
          height: ""
        }
      }
    case COMPLETE_CROP:
      return {
        ...state,
        croppedImage: processCrop(action.pixelCrop, state.image.base64),
        pixelCrop: action.pixelCrop
      }
    case JULKISET_REQUEST:
      return {
        ...state,
        julkiset: []
      }
    case JULKISET_SUCCESS:
      return {
        ...state,
        julkiset: action.params.julkiset,
        sortColumn: action.params.newSortColumn
      }
    case JULKISET_LAAJENNA:
      return {
        ...state,
        julkisetVisible: R.uniq(R.append(action.username, state.julkisetVisible))
      }
    case JULKISET_SUPISTA:
      return {
        ...state,
        julkisetVisible: R.without(action.username, state.julkisetVisible)
      }
    default:
      return state
  }
}

export default kiekkoReducer
