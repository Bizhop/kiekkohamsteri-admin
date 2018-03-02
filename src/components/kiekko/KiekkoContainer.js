import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import FileBase64 from "react-file-base64"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import ReactImageMagnify from "react-image-magnify"

import {
  getKiekot,
  toggleEditModal,
  updateDisc,
  chooseImage,
  uploadImage,
  deleteDisc
} from "./kiekkoActions"
import { getDropdowns, getDropdownsByValmistaja } from "../dropdown/dropdownActions"
import { edit, imageUrl, del, magnify } from "../shared/images"
import Modal from "../shared/Modal"
import KiekkoEditForm from "./KiekkoEditForm"
import ThWithButton from "../shared/ThWithButton"

const handleDelete = params => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa kiekon?",
    confirmLabel: "Poista",
    cancelLabel: "Peruuta",
    onConfirm: () => params.confirm(params.id)
  })
}

const tableHeaders = [
  {
    label: "Kuva"
  },
  {
    label: "Id",
    sort: "id,asc"
  },
  {
    label: "Valmistaja",
    sort: "mold.valmistaja.valmistaja,asc"
  },
  {
    label: "Mold",
    sort: "mold.kiekko,asc"
  },
  {
    label: "Muovi",
    sort: "muovi.muovi,asc"
  },
  {
    label: "Nopeus",
    sort: "mold.nopeus,desc"
  },
  {
    label: "Liito",
    sort: "mold.liito,desc"
  },
  {
    label: "Vakaus",
    sort: "mold.vakaus,asc"
  },
  {
    label: "Feidi",
    sort: "mold.feidi,asc"
  },
  {
    label: "Paino",
    sort: "paino,desc"
  }
]

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
    />
    <h1>Uusi kiekko</h1>
    <div className="row">
      <div className="col-md-1">Kuva</div>
      <div className="col-md-3">
        <FileBase64 multiple={false} onDone={props.chooseImage} />
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => props.uploadImage(props.imageData)}
        >
          Luo uusi
        </button>
      </div>
    </div>
    <h1>Kiekot</h1>
    {!props.loggedIn && <Redirect to="/" />}
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          {tableHeaders.map(t => (
            <ThWithButton {...t} update={props.updateKiekot} sortColumn={props.sortColumn} />
          ))}
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {props.kiekot.map(p => (
          <Kiekko
            key={p.id}
            kiekko={p}
            toggleEditModal={props.toggleEditModal}
            deleteDisc={props.deleteDisc}
          />
        ))}
      </tbody>
    </table>
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

const Kiekko = props => {
  const kiekko = props.kiekko
  return (
    <tr>
      <td>
        <ReactImageMagnify {...magnify(kiekko.kuva)} />
      </td>
      <td>{kiekko.id}</td>
      <td>{kiekko.valmistaja}</td>
      <td>{kiekko.mold}</td>
      <td>{kiekko.muovi}</td>
      <td>{kiekko.nopeus}</td>
      <td>{kiekko.liito}</td>
      <td>{kiekko.vakaus}</td>
      <td>{kiekko.feidi}</td>
      <td>{kiekko.paino}</td>
      <td>
        <input
          type="image"
          alt="edit"
          src={edit}
          height="15"
          width="15"
          onClick={() => props.toggleEditModal(kiekko)}
        />
      </td>
      <td>
        <input
          type="image"
          alt="delete"
          src={del}
          height="15"
          width="15"
          onClick={() =>
            handleDelete({
              id: kiekko.id,
              confirm: props.deleteDisc
            })}
        />
      </td>
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  kiekot: R.pathOr([], ["kiekko", "kiekot"], state),
  sortColumn: R.path(["kiekko", "sortColumn"], state),
  isEditOpen: R.path(["kiekko", "isEditOpen"], state),
  kiekkoInEdit: R.path(["kiekko", "kiekkoInEdit"], state),
  dropdowns: R.path(["dropdowns", "dropdowns"], state),
  editFormValues: R.path(["form", "kiekkoEditForm", "values"], state),
  imageData: R.path(["kiekko", "image", "base64"], state)
})

const mapDispatchToProps = dispatch => ({
  getKiekot: dispatch(
    getKiekot({
      sort: "id,asc",
      newSortColumn: "Id"
    })
  ),
  updateKiekot: params => dispatch(getKiekot(params)),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByValmistaja: valmId => dispatch(getDropdownsByValmistaja(valmId)),
  updateDisc: kiekko => dispatch(updateDisc(kiekko)),
  toggleEditModal: kiekko => dispatch(toggleEditModal(kiekko)),
  chooseImage: image => dispatch(chooseImage(image)),
  uploadImage: data => dispatch(uploadImage(data)),
  deleteDisc: id => dispatch(deleteDisc(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
