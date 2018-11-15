import React from "react"
import TextField from "@material-ui/core/TextField"

const FormGroup = (props) => {
  const {
    name,
    label,
    helperText,
    type,
    placeholder,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    options = [],
  } = props

  const commons = {
    id: name,
    label,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: errors[name] && touched[name] ? "text-input error" : "text-input",
    helperText,
    placeholder,
    fullWidth: true,
    margin: "normal",
  }

  return (
    <div className="formField">
      {type === "select" ? (
        <TextField { ...commons } select SelectProps={ { native: true } }>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(o => (
            <option value={ o.value || o } key={ o.value || o }>
              {o.text || o}
            </option>
          ))}
        </TextField>
      ) : (
        <TextField { ...commons } />
      )}
      {errors[name] && touched[name] && <div className="input-feedback">{errors[name]}</div>}
    </div>
  )
}

export default FormGroup
