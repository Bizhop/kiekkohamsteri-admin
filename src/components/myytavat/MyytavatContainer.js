import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getMyytavat } from "./myytavatActions"
import { buyDisc, getOmat, peruutaOsto, hyvaksyOsto } from "../osto/ostoActions"
import MyytavatTable from "./MyytavatTable"
import OstoTable from "./OstoTable"
import MyyntiTable from "./MyyntiTable"

const MyytavatContainer = props => (
  <div className="container">
    <h1>Omat ostot</h1>
    {props.kaupat && (
      <OstoTable
        ostot={props.kaupat.ostajana}
        action={{ action: props.peruuta, label: "Peruuta" }}
      />
    )}
    <h1>Omat myynnit</h1>
    {props.kaupat && (
      <MyyntiTable
        myynnit={props.kaupat.myyjana}
        accept={{ action: props.accept, label: "Hyväksy" }}
        cancel={{ action: props.peruuta, label: "Peruuta" }}
      />
    )}
    <h1>Myytävät</h1>
    {!props.loggedIn && <Redirect to="/" />}
    <MyytavatTable
      updateMyytavat={props.updateMyytavat}
      sortColumn={props.sortColumn}
      kiekot={props.kiekot}
      action={{
        action: props.buyDisc,
        label: "Osta"
      }}
      username={props.username}
    />
  </div>
)

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  username: R.path(["user", "user", "username"], state),
  kiekot: R.pathOr([], ["myytavat", "kiekot"], state),
  sortColumn: R.path(["myytavat", "sortColumn"], state),
  kaupat: R.path(["osto", "data"], state)
})

const mapDispatchToProps = dispatch => ({
  getMyytavat: dispatch(
    getMyytavat({
      sort: "id,asc",
      newSortColumn: "Id"
    })
  ),
  getOstot: dispatch(getOmat()),
  updateMyytavat: params => dispatch(getMyytavat(params)),
  buyDisc: id => dispatch(buyDisc(id)),
  accept: id => dispatch(hyvaksyOsto(id)),
  peruuta: id => dispatch(peruutaOsto(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyytavatContainer)
