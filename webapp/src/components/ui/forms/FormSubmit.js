import React from "react"

const FormSubmit = ({ handleReset, dirty, isSubmitting }) => {
  return (
    <div>
      <button type="button" className="outline" onClick={ handleReset } disabled={ !dirty || isSubmitting }>
        Reset
      </button>
      <button type="submit" disabled={ isSubmitting }>
        Submit
      </button>
    </div>
  )
}

export default FormSubmit
