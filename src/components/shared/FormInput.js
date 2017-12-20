import React from 'react'

export const RenderTextInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="form-control-label" htmlFor={input.name}>
      {label}
    </label>
    <input className="form-control" {...input} type={type} />
    {touched && error && <span className="text-danger">{error}</span>}
  </div>
)

export const RenderSelectInput = ({ input, label, type, options, meta: { touched, error } }) => {
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

export const RenderCheckbox = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-check form-check-inline">
    <label className="form-check-label" htmlFor={input.name}>
      <input className="form-check-input" {...input} type={type} />
      {label}
    </label>

    {touched && error && <span className="text-danger">{error}</span>}
  </div>
)
