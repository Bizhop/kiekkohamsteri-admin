import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getMolds } from './moldActions'

const MoldContainer = props => (
  <div className="container">
    <h1>Moldit</h1>
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          <th>Id</th>
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

const Mold = props => {
  const mold = props.mold
  return (
    <tr>
      <td>{mold.id}</td>
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
  molds: R.path(['mold', 'molds'], state),
})

const mapDispatchToProps = dispatch => ({
  getMolds: dispatch(getMolds()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoldContainer)
