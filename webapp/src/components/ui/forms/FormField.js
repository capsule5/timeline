import React from "react"
import { TextField, MenuItem } from "@material-ui/core"

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
    name,
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
        <TextField { ...commons } select>
          {placeholder && <MenuItem value="">{placeholder}</MenuItem>}
          {options.map(o => (
            <MenuItem value={ o.value || o } key={ o.value || o }>
              {o.text || o}
            </MenuItem>
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
