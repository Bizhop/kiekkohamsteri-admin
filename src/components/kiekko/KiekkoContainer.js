import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getKiekot, toggleEditModal, updateDisc } from "./kiekkoActions"
import { getDropdowns, getDropdownsByValmistaja } from "../dropdown/dropdownActions"
import { edit, imageUrl } from "../shared/images"
import Modal from "../shared/Modal"
import KiekkoEditForm from "./KiekkoEditForm"

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
    <h1>Kiekot</h1>
    {!props.loggedIn && <Redirect to="/" />}
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          <th>Kuva</th>
          <th>Id</th>
          <th>Valmistaja</th>
          <th>Mold</th>
          <th>Muovi</th>
          <th>Nopeus</th>
          <th>Liito</th>
          <th>Vakaus</th>
          <th>Feidi</th>
          <th>Paino</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {props.kiekot.map(p => (
          <Kiekko key={p.id} kiekko={p} toggleEditModal={props.toggleEditModal} />
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
        <img alt="kuva" src={`${imageUrl}t_lista/${kiekko.kuva}`} height="30" width="30" />
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
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "user"], state),
  kiekot: R.pathOr([], ["kiekko", "kiekot", "content"], state),
  isEditOpen: R.path(["kiekko", "isEditOpen"], state),
  kiekkoInEdit: R.path(["kiekko", "kiekkoInEdit"], state),
  dropdowns: R.path(["dropdowns", "dropdowns"], state),
  editFormValues: R.path(["form", "kiekkoEditForm", "values"], state)
})

const mapDispatchToProps = dispatch => ({
  getKiekot: dispatch(getKiekot()),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByValmistaja: valmId => dispatch(getDropdownsByValmistaja(valmId)),
  updateDisc: kiekko => dispatch(updateDisc(kiekko)),
  toggleEditModal: kiekko => dispatch(toggleEditModal(kiekko))
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
