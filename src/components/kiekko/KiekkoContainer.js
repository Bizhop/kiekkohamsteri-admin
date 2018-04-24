import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import FileBase64 from "react-file-base64"
import ReactCrop from "react-image-crop"
import "react-image-crop/lib/ReactCrop.scss"

import {
  getKiekot,
  toggleEditModal,
  updateDisc,
  chooseImage,
  uploadImage,
  deleteDisc,
  applyPredicates,
  updateCrop,
  completeCrop,
  updateImage
} from "./kiekkoActions"
import { getDropdowns, getDropdownsByValmistaja } from "../dropdown/dropdownActions"
import Modal from "../shared/Modal"
import KiekkoEditForm from "./KiekkoEditForm"
import ThWithButton from "../shared/ThWithButton"
import PredicatesForm from "./PredicatesForm"
import KiekkoTable from "./KiekkoTable"
import { defaultSort } from "../shared/text"
import { upload } from "../shared/images"

const KiekkoContainer = props => (
  <div className="container">
    <KiekkoEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      updateDisc={props.updateDisc}
      kiekkoInEdit={props.kiekkoInEdit}
      dropdowns={props.dropdowns}
      getDropdownsByValmistaja={props.getDropdownsByValmistaja}
      editFormValues={props.editFormValues}
      image={props.image}
    />
    <h1>Kuvan valinta</h1>
    <div className="row mb-10">
      <div className="col-md-3">
        <FileBase64 multiple={false} onDone={props.chooseImage} />
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => props.uploadImage(props.croppedImage)}
          disabled={props.image === null}
        >
          Luo uusi kiekko
        </button>
      </div>
    </div>
    <p>Kiekon lisäys: valitse ensin kuva, tee rajaus ja paina nappia "Lisää uusi kiekko"</p>
    <p>
      Kuvan päivitys: valitse ensin kuva, tee rajaus ja paina sitten haluamasi kiekon kohdalta
      upload-nappia <img alt="kuva" src={upload} />
    </p>
    {props.image && (
      <div>
        <h2>Esikatselu</h2>
        <ReactCrop
          src={props.image.base64}
          onChange={props.updateCrop}
          crop={props.crop}
          onComplete={props.completeCrop}
        />
      </div>
    )}
    <h1>
      Kiekot ({props.totalFiltered} / {props.total})
    </h1>
    <PredicatesForm onSubmit={props.applyPredicates} />
    {!props.loggedIn && <Redirect to="/" />}
    <KiekkoTable
      kiekot={props.kiekot}
      updateKiekot={props.updateKiekot}
      toggleEditModal={props.toggleEditModal}
      deleteDisc={props.deleteDisc}
      sortColumn={props.sortColumn}
      updateImage={props.updateImage}
      image={props.croppedImage}
    />
  </div>
)

const KiekkoEditModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={() => props.toggleModal(null)}
    contentLabel="Kiekon muokkaus"
  >
    <KiekkoEditForm
      onSubmit={props.updateDisc}
      initialValues={props.kiekkoInEdit}
      dropdowns={props.dropdowns}
      getDropdownsByValmistaja={props.getDropdownsByValmistaja}
      editFormValues={props.editFormValues}
    />
  </Modal>
)

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  kiekot: R.pathOr([], ["kiekko", "kiekotFiltered"], state),
  total: R.length(R.pathOr([], ["kiekko", "kiekot"], state)),
  totalFiltered: R.length(R.pathOr([], ["kiekko", "kiekotFiltered"], state)),
  sortColumn: R.path(["kiekko", "sortColumn"], state),
  isEditOpen: R.path(["kiekko", "isEditOpen"], state),
  kiekkoInEdit: R.path(["kiekko", "kiekkoInEdit"], state),
  dropdowns: R.path(["dropdowns", "dropdowns"], state),
  editFormValues: R.path(["form", "kiekkoEditForm", "values"], state),
  predicates: R.path(["kiekko", "predicates"], state),
  image: R.path(["kiekko", "image"], state),
  crop: R.path(["kiekko", "crop"], state),
  croppedImage: R.path(["kiekko", "croppedImage"], state)
})

const mapDispatchToProps = dispatch => ({
  getKiekot: dispatch(getKiekot(defaultSort)),
  updateKiekot: params => dispatch(getKiekot(params)),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByValmistaja: valmId => dispatch(getDropdownsByValmistaja(valmId)),
  updateDisc: kiekko => dispatch(updateDisc(kiekko)),
  toggleEditModal: kiekko => dispatch(toggleEditModal(kiekko)),
  chooseImage: image => dispatch(chooseImage(image)),
  uploadImage: data => dispatch(uploadImage(data)),
  deleteDisc: id => dispatch(deleteDisc(id)),
  applyPredicates: form => dispatch(applyPredicates(form)),
  updateCrop: crop => dispatch(updateCrop(crop)),
  completeCrop: (crop, pixelCrop) => dispatch(completeCrop(crop, pixelCrop)),
  updateImage: params => dispatch(updateImage(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
