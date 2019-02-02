import React from "react"

const FormApiErrors = ({ errors }) => {
  if (errors.fromApi) {
    return (
      <div className="form__errors" color="primary">
        {errors.fromApi.message}
      </div>
    )
  }
  return null
}

export default FormApiErrors
