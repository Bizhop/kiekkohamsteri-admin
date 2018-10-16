import R from "ramda"
import React from "react"
import { FieldArray, Field, reduxForm } from "redux-form"

import { RenderCheckbox } from "../shared/FormInput"

const RoundsForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <FieldArray name="rounds" component={Rounds} />
    </form>
  )
}

const Rounds = ({ fields }) => (
  <table className="table table-striped custom-table">
    <thead>
      <tr>
        <th>Kilpailu</th>
        <th>Pvm</th>
        <th>Kierros</th>
        <th>Tulos</th>
        <th>Rating</th>
        <th>Väyliä</th>
        <th>Mukana</th>
        <th>Tuplana</th>
      </tr>
    </thead>
    <tbody>
      {fields.map((d, idx) => {
        const round = fields.get(idx)
        const key = `round-${idx}`
        return (
          <tr key={key}>
            <td>
              <a target="_tournament" href={round.link}>
                {round.tournament}
              </a>
            </td>
            <td>{round.date}</td>
            <td className="text-right">{round.round}</td>
            <td className="text-right">{round.score}</td>
            <td className="text-right">{round.rating}</td>
            <td className="text-right">{round.holes}</td>
            <td className="text-center">{round.included && "X"}</td>
            <td className="text-center">{round.doubled && "X"}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default reduxForm({ form: "roundsForm" })(RoundsForm)
