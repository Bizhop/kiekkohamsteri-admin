import React from 'react'

const RenderTextInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="form-control-label" htmlFor={input.name}>
      {label}
    </label>
    <input className="form-control" {...input} type={type} />
    {touched && error && <span className="text-danger">{error}</span>}
  </div>
)

const RenderSelectInput = ({ input, label, type, options, meta: { touched, error } }) => {
  const optionList = options.map(opt => (
    <option key={opt.value} value={opt.value}>
      {opt.name}
    </option>
  ))
  return (
    <div className="form-group">
      <label className="form-control-label" htmlFor={input.name}>
        {label}
      </label>
      <select className="form-control" {...input} type={type}>
        <option value="">Valitse...</option>
        {optionList}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  )
}

export { RenderSelectInput, RenderTextInput }
