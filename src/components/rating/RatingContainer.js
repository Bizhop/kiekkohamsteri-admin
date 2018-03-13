import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getRating } from "./ratingActions"

const RatingContainer = props => (
  <div className="container">
    <h1>Rating noppa</h1>
    <div className="row">
      <div className="col-md-2">
        <button className="btn btn-primary btn-block" onClick={() => props.getRating(90313)}>
          Hae kierrokset
        </button>
      </div>
    </div>
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          <th>Kisa</th>
          <th>Pvm</th>
          <th>Kierros</th>
          <th>Tulos</th>
          <th>Rating</th>
          <th>Väyliä</th>
          <th>Mukana</th>
        </tr>
      </thead>
      <tbody>{props.rounds.map(r => <Round key={r.id} round={r} />)}</tbody>
    </table>
    {!props.loggedIn && <Redirect to="/" />}
  </div>
)

const Round = props => {
  const round = props.round
  return (
    <tr>
      <td>{round.tournament}</td>
      <td>
        {round.date.year}-{pad(round.date.monthValue)}-{pad(round.date.dayOfMonth)}
      </td>
      <td>{round.round}</td>
      <td>{round.score}</td>
      <td>{round.rating}</td>
      <td>{round.holes}</td>
      <td>{round.included && "X"}</td>
    </tr>
  )
}

const pad = number => {
  var s = "0" + number
  return s.substring(s.length - 2)
}

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  rounds: R.path(["rating", "rounds"], state),
  user: R.path(["user", "user"], state)
})

const mapDispatchToProps = dispatch => ({
  getRating: pdga => dispatch(getRating(pdga))
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer)
