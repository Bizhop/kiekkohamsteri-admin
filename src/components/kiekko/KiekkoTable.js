import React from "react"
import ReactImageMagnify from "react-image-magnify"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

import ThWithButton from "../shared/ThWithButton"
import { edit, del, magnify } from "../shared/images"

const KiekkoTable = props => (
  <table className="table table-striped custom-table">
    <thead>
      <tr>
        {tableHeaders.map(t => (
          <ThWithButton
            {...t}
            key={t.label}
            update={props.updateKiekot}
            sortColumn={props.sortColumn}
          />
        ))}
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {props.kiekot.map(p => (
        <Kiekko
          key={p.id}
          kiekko={p}
          toggleEditModal={props.toggleEditModal}
          deleteDisc={props.deleteDisc}
        />
      ))}
    </tbody>
  </table>
)

const Kiekko = props => {
  const kiekko = props.kiekko
  return (
    <tr>
      <td>
        <ReactImageMagnify {...magnify(kiekko.kuva)} />
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
      <td>
        <input
          type="image"
          alt="edit"
          src={edit}
          height="15"
          width="15"
          onClick={() => props.toggleEditModal(kiekko)}
        />
      </td>
      <td>
        <input
          type="image"
          alt="delete"
          src={del}
          height="15"
          width="15"
          onClick={() =>
            handleDelete({
              id: kiekko.id,
              confirm: props.deleteDisc
            })}
        />
      </td>
    </tr>
  )
}

const tableHeaders = [
  {
    label: "Kuva"
  },
  {
    label: "Id",
    sort: "id,desc"
  },
  {
    label: "Valmistaja",
    sort: "mold.valmistaja.valmistaja,asc&sort=mold.kiekko,asc"
  },
  {
    label: "Mold",
    sort: "mold.kiekko,asc"
  },
  {
    label: "Muovi",
    sort: "muovi.muovi,asc"
  },
  {
    label: "Nopeus",
    sort: "mold.nopeus,desc"
  },
  {
    label: "Liito",
    sort: "mold.liito,desc"
  },
  {
    label: "Vakaus",
    sort: "mold.vakaus,asc"
  },
  {
    label: "Feidi",
    sort: "mold.feidi,asc"
  },
  {
    label: "Paino",
    sort: "paino,desc"
  }
]

const handleDelete = params => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa kiekon?",
    confirmLabel: "Poista",
    cancelLabel: "Peruuta",
    onConfirm: () => params.confirm(params.id)
  })
}

export default KiekkoTable