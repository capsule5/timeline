import React from "react"

const FormGroup = (props) => {
  const {
    name, label, type, placeholder, values, errors, touched, handleChange, handleBlur, options = [],
  } = props

  return (
    <div className="formGroup">
      <label htmlFor={ name }>
        <span>{label}</span>
      </label>
      {type === "select" ? (
        <select id={ name } value={ values[name] } onChange={ handleChange } onBlur={ handleBlur }>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option value={ o.value || o } key={ o.value || o }>
              {o.text || o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={ name }
          placeholder={ placeholder }
          type={ type }
          value={ values[name] }
          onChange={ handleChange }
          onBlur={ handleBlur }
          className={ errors[name] && touched[name] ? "text-input error" : "text-input" }
        />
      )}
      {errors[name] && touched[name] && <div className="input-feedback">{errors[name]}</div>}
    </div>
  )
}

export default FormGroup
