import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/react-activity.css"

import { getRating, getCustomRating } from "./ratingActions"
import RoundsForm from "./RoundsForm"

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
      <div>
        <div className="row rating">
          <div className="col-md-2">
            <strong>Uusi rating</strong>
          </div>
          <div className="col-md-2">{props.nextRating}</div>
        </div>
        <RoundsForm
          onSubmit={props.getCustomRating}
          initialValues={props.rating}
          roundsValues={props.roundsValues}
        />
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
  rating: R.pathOr({}, ["rating"], state),
  fetching: R.path(["rating", "fetching"], state),
  roundsValues: R.pathOr({}, ["form", "roundsForm", "values"], state)
})

const mapDispatchToProps = dispatch => ({
  getRating: pdga => dispatch(getRating(pdga)),
  getCustomRating: rounds => dispatch(getCustomRating(rounds))
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer)
