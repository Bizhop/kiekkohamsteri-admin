import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/react-activity.css"

import { getRating } from "./ratingActions"

const RatingContainer = props => (
  <div className="container">
    <h1>Rating noppa</h1>
    <div className="row">
      <div className="col-md-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => props.getRating(props.user.pdga_num)}
        >
          Arvo rating
        </button>
      </div>
    </div>
    {props.error && (
      <div className="row rating">
        <div className="col-md-4">
          <div className="alert alert-danger">{props.error}</div>
        </div>
      </div>
    )}
    {props.fetching && <Spinner />}
    {props.nextRating && (
      <div className="row rating">
        <div className="col-md-2">
          <strong>Uusi rating</strong>
        </div>
        <div className="col-md-2">{props.nextRating}</div>
      </div>
    )}
    {!props.loggedIn && <Redirect to="/" />}
  </div>
)

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  user: R.path(["user", "user"], state),
  error: R.path(["rating", "error"], state),
  nextRating: R.path(["rating", "nextRating"], state),
  fetching: R.path(["rating", "fetching"], state)
})

const mapDispatchToProps = dispatch => ({
  getRating: pdga => dispatch(getRating(pdga))
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer)
