import React from "react"
import R from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import ReactImageMagnify from "react-image-magnify"

import { getMyytavat } from "./myytavatActions"
import { imageUrl } from "../shared/images"

const KiekkoContainer = props => (
  <div className="container">
    <h1>Myytävät</h1>
    {!props.loggedIn && <Redirect to="/" />}
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Myyjä</th>
          <th>Hinta</th>
          <th>Kiekko</th>
          <th>Lentonumerot</th>
          <th>Paino</th>
          <th>Kuva</th>
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
      <td>
        <ReactImageMagnify
          {...{
            largeImage: {
              alt: "",
              src: `${imageUrl}t_kiekko/${kiekko.kuva}`,
              width: 600,
              height: 600
            },
            smallImage: {
              alt: "kuva",
              src: `${imageUrl}t_thumb/${kiekko.kuva}`,
              isFluidWidth: true
            },
            isHintEnabled: false,
            enlargedImageContainerDimensions: {
              width: 600,
              height: 600
            }
          }}
        />
      </td>
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
  kiekot: R.pathOr([], ["myytavat", "kiekot", "content"], state)
})

const mapDispatchToProps = dispatch => ({
  getMyytavat: dispatch(getMyytavat())
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
