import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/react-activity.css"

import LeaderTable from "./LeaderTable"
import { getLeaders } from "../user/userActions"
import { getJulkiset, laajenna, supista } from "../kiekko/kiekkoActions"
import KiekkoTable from "../kiekko/KiekkoTable"
import { plus, minus } from "../shared/images"
import { defaultSort } from "../shared/text"

const MuutContainer = props => (
  <div className="container">
    <h1>Kunniataulukko</h1>
    {props.leaders && (
      <div className="row">
        <div className="col-md-6">
          <LeaderTable leaders={props.leaders} />
        </div>
      </div>
    )}
    <h1>Julkiset listat</h1>
    {props.julkiset ? (
      props.julkiset.map(j => (
        <Julkiset
          lista={j}
          key={j.username}
          julkisetVisible={props.julkisetVisible}
          laajenna={props.laajenna}
          supista={props.supista}
          updateKiekot={props.updateKiekot}
          sortColumn={props.sortColumn}
        />
      ))
    ) : (
      <Spinner />
    )}
    {!props.loggedIn && <Redirect to="/" />}
  </div>
)

const Julkiset = props => (
  <div className="row">
    <div className="col-md-12">
      <h2>{props.lista.username}</h2>
      {!R.contains(props.lista.username, props.julkisetVisible) ? (
        <img
          src={plus}
          alt="laajenna"
          height="30"
          width="30"
          onClick={() => props.laajenna(props.lista.username)}
        />
      ) : (
        <div>
          <img
            src={minus}
            alt="supista"
            height="30"
            width="30"
            onClick={() => props.supista(props.lista.username)}
          />
          <KiekkoTable
            kiekot={props.lista.kiekot}
            editable={false}
            updateKiekot={props.updateKiekot}
            sortColumn={props.sortColumn}
          />
        </div>
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  leaders: R.path(["user", "leaders"], state),
  julkiset: R.path(["kiekko", "julkiset"], state),
  julkisetVisible: R.path(["kiekko", "julkisetVisible"], state),
  sortColumn: R.path(["kiekko", "sortColumn"], state)
})

const mapDispatchToProps = dispatch => ({
  getLeaders: dispatch(getLeaders()),
  getJulkiset: dispatch(getJulkiset(defaultSort)),
  laajenna: username => dispatch(laajenna(username)),
  supista: username => dispatch(supista(username)),
  updateKiekot: params => dispatch(getJulkiset(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MuutContainer)
