import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { RenderTextInput, RenderSelectInput } from '../shared/FormInput'

const valmistajaDropdown = valms => valms.map(v => ({ name: v.valmistaja, value: v.id }))
const moldDropdown = molds => molds.map(m => ({ name: m.kiekko, value: m.id }))
const muoviDropdown = muovit => muovit.map(m => ({ name: m.muovi, value: m.id }))
const variDropdown = varit => varit.map(v => ({ name: v.vari, value: v.id }))

const KiekkoEditForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="valmId"
      label="Valmistaja"
      type="select"
      component={RenderSelectInput}
      options={valmistajaDropdown(props.dropdowns.valms)}
      onChange={(e, newValue) => props.getDropdownsByValmistaja(newValue)}
    />
    <Field
      name="moldId"
      label="Mold"
      type="select"
      component={RenderSelectInput}
      options={moldDropdown(props.dropdowns.molds)}
    />
    <Field
      name="muoviId"
      label="Muovi"
      type="select"
      component={RenderSelectInput}
      options={muoviDropdown(props.dropdowns.muovit)}
    />
    <Field
      name="variId"
      label="Väri"
      type="select"
      component={RenderSelectInput}
      options={variDropdown(props.dropdowns.varit)}
    />
    <Field name="paino" label="Paino" component={RenderTextInput} type="text" />
    <Field name="muuta" label="Muuta" component={RenderTextInput} type="text" />
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={props.submitting || props.pristine}
    >
      Tallenna
    </button>
  </form>
)

export default reduxForm({
  form: 'kiekkoEdiForm',
})(KiekkoEditForm)
