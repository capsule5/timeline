import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { FormGroup, FormSubmit } from ".."

const TimelineForm = ({ createTimeline }) => {
  return (
    <>
      <h2>Enter new timeline:</h2>
      <Formik
        initialValues={ {
          title: "",
        } }
        validationSchema={ Yup.object().shape({
          title: Yup.string()
            .min(3)
            .required(),
        }) }
        onSubmit={ (values, { setSubmitting }) => {
          createTimeline(values)
          setSubmitting(false)
        } }
        render={ ({
          handleSubmit, handleReset, dirty, isSubmitting, ...formikProps
        }) => (
          <form onSubmit={ handleSubmit }>
            <FormGroup name="title" label="Title" placeholder="Enter timeline title" type="text" { ...formikProps } />
            <FormSubmit
              handleSubmit={ handleSubmit }
              handleReset={ handleReset }
              dirty={ dirty }
              isSubmitting={ isSubmitting }
            />
          </form>
        ) }
      />
    </>
  )
}

export default TimelineForm
