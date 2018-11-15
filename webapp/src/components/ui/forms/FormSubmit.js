import React from "react"
import Button from "@material-ui/core/Button"

const FormSubmit = ({ handleReset, dirty, isSubmitting }) => {
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
        Enter
      </Button>
    </div>
  )
}

export default FormSubmit
