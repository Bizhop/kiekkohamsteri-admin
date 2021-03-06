import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/react-activity.css"

import { getRating, getCustomRating, initRating } from "./ratingActions"
import RoundsForm from "./RoundsForm"

const RatingContainer = props => (
  <div className="container">
    <h1>Rating-laskuri</h1>
    <div className="row">
      <div className="col-md-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => props.getRating(props.user.pdga_num)}
        >
          Hae kierrokset
        </button>
      </div>
      {props.nextRating && (
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-6">
              <strong>Laskettu rating</strong>
            </div>
            <div className="col-md-6">{props.nextRating}</div>
          </div>
        </div>
      )}
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
        <RoundsForm
          onSubmit={props.getCustomRating}
          initialValues={props.rating}
          roundsValues={props.roundsValues}
          customRating={props.customRating}
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
  customRating: R.path(["rating", "customRating"], state),
  rating: R.pathOr({}, ["rating"], state),
  fetching: R.path(["rating", "fetching"], state),
  roundsValues: R.pathOr({}, ["form", "roundsForm", "values"], state)
})

const mapDispatchToProps = dispatch => ({
  init: dispatch(initRating()),
  getRating: pdga => dispatch(getRating(pdga)),
  getCustomRating: form => dispatch(getCustomRating(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer)
