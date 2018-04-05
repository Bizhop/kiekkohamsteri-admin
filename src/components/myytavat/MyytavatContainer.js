import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getMyytavat } from "./myytavatActions"
import { buyDisc } from "../osto/ostoActions"
import MyytavatTable from "./MyytavatTable"

const KiekkoContainer = props => (
  <div className="container">
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
    />
  </div>
)

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  kiekot: R.pathOr([], ["myytavat", "kiekot"], state),
  sortColumn: R.path(["myytavat", "sortColumn"], state)
})

const mapDispatchToProps = dispatch => ({
  getMyytavat: dispatch(
    getMyytavat({
      sort: "id,asc",
      newSortColumn: "Id"
    })
  ),
  updateMyytavat: params => dispatch(getMyytavat(params)),
  buyDisc: id => dispatch(buyDisc(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
