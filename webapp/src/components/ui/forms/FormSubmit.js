import React from "react"
import Button from "@material-ui/core/Button"

const FormSubmit = ({ isSubmitting, submitText }) => {
  return (
    <div className="form__submit">
      {/* <button type="button" className="outline" onClick={ handleReset } disabled={ !dirty || isSubmitting }>
        Reset
      </button> */}
      <Button
        type="submit"
        disabled={ isSubmitting }
        variant="contained"
        color="primary"
      >
        {submitText}
      </Button>
    </div>
  )
}

export default FormSubmit
