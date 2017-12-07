import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getKiekot } from './kiekkoActions'
import { edit } from '../shared/images'

const imageUrl = 'https://res.cloudinary.com/djc4j4dcs/'

const KiekkoContainer = props => (
  <div className="container">
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
      <tbody>{props.kiekot.map(p => <Kiekko key={p.id} kiekko={p} />)}</tbody>
    </table>
  </div>
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
      <td>{/* <img alt="edit" src={edit} height="15" width="15" /> */}</td>
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: R.path(['user', 'user'], state),
  kiekot: R.pathOr([], ['kiekko', 'kiekot', 'content'], state),
})

const mapDispatchToProps = dispatch => ({
  getKiekot: dispatch(getKiekot()),
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
