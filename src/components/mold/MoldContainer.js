import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getMolds, getMoldsByValmistaja, toggleCreateModal, createMold } from './moldActions'
import { getDropdowns } from '../dropdown/dropdownActions'
import SelectValmistajaForm from './SelectValmistajaForm'
import Modal from '../shared/Modal'
import CreateMoldForm from './CreateMoldForm'

const MoldContainer = props => (
  <div className="container">
    <MoldCreateModal
      isOpen={props.isCreateOpen}
      toggleModal={props.toggleCreateModal}
      createMold={props.createMold}
      valmId={props.valmId}
    />
    <h1>Moldit</h1>
    <SelectValmistajaForm
      valmistajat={R.pathOr([], ['dropdowns', 'valms'], props)}
      getMoldsByValmistaja={props.getMoldsByValmistaja}
    />
    <div className="row">
      <div className="col-md-4">
        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => props.toggleCreateModal()}
            disabled={props.valmId === null || props.valmId === ''}
          >
            Uusi moldi
          </button>
        </div>
      </div>
    </div>
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Valmistaja</th>
          <th>Kiekko</th>
          <th>Nopeus</th>
          <th>Liito</th>
          <th>Vakaus</th>
          <th>Feidi</th>
        </tr>
      </thead>
      <tbody>{props.molds.map(p => <Mold key={p.id} mold={p} />)}</tbody>
    </table>
    {!props.loggedIn && <Redirect to="/" />}
  </div>
)

const MoldCreateModal = props => (
  <Modal isOpen={props.isOpen} onRequestClose={() => props.toggleModal()} contentLabel="Uusi moldi">
    <CreateMoldForm onSubmit={props.createMold} initialValues={{ valmId: props.valmId }} />
  </Modal>
)

const Mold = props => {
  const mold = props.mold
  return (
    <tr>
      <td>{mold.id}</td>
      <td>{mold.valmistaja}</td>
      <td>{mold.kiekko}</td>
      <td>{mold.nopeus}</td>
      <td>{mold.liito}</td>
      <td>{mold.vakaus}</td>
      <td>{mold.feidi}</td>
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: R.path(['user', 'token'], state),
  molds: R.path(['mold', 'molds', 'content'], state),
  dropdowns: R.path(['dropdowns', 'dropdowns'], state),
  isCreateOpen: R.path(['mold', 'isCreateOpen'], state),
  valmId: R.path(['mold', 'valmId'], state),
})

const mapDispatchToProps = dispatch => ({
  getMolds: dispatch(getMolds()),
  getDropdowns: dispatch(getDropdowns()),
  getMoldsByValmistaja: valmId => dispatch(getMoldsByValmistaja(valmId)),
  toggleCreateModal: () => dispatch(toggleCreateModal()),
  createMold: mold => dispatch(createMold(mold)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoldContainer)
