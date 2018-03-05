import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import ReactImageMagnify from "react-image-magnify"

import { getMyytavat } from "./myytavatActions"
import { imageUrl, magnify, check } from "../shared/images"
import ThWithButton from "../shared/ThWithButton"

const tableHeaders = [
  {
    label: "Kuva"
  },
  {
    label: "Id",
    sort: "id,asc"
  },
  {
    label: "Omistaja",
    sort: "member.username,asc"
  },
  {
    label: "Hinta",
    sort: "hinta,asc"
  },
  {
    label: "Kiekko"
  },
  {
    label: "Lentonumerot"
  },
  {
    label: "Paino",
    sort: "paino,asc"
  },
  {
    label: "Dyed",
    sort: "dyed,desc"
  },
  {
    label: "Hohto",
    sort: "hohto,desc"
  },
  {
    label: "Swirly",
    sort: "swirly,desc"
  },
  {
    label: "Spessu",
    sort: "spessu,desc"
  }
]

const KiekkoContainer = props => (
  <div className="container">
    <h1>Myytävät</h1>
    {!props.loggedIn && <Redirect to="/" />}
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          {tableHeaders.map(t => (
            <ThWithButton {...t} update={props.updateMyytavat} sortColumn={props.sortColumn} />
          ))}
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
        <ReactImageMagnify {...magnify(kiekko.kuva)} />
      </td>
      <td>{kiekko.id}</td>
      <td>{kiekko.omistaja}</td>
      <td>{kiekko.hinta} €</td>
      <td>
        {kiekko.valmistaja} {kiekko.muovi} {kiekko.mold}
      </td>
      <td>
        {kiekko.nopeus} / {kiekko.liito} / {kiekko.vakaus} / {kiekko.feidi}
      </td>
      <td>{kiekko.paino}</td>
      <td>{kiekko.dyed ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.hohto ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.swirly ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.spessu ? <img className="on-table" src={check} alt="" /> : ""}</td>
    </tr>
  )
}

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
  updateMyytavat: params => dispatch(getMyytavat(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
