import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { FormField, FormSubmit } from ".."
import "../Form.scss"

const TimelineForm = ({ createTimeline }) => {
  return (
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
        <form onSubmit={ handleSubmit } className="form">
          <FormField name="title" label="Title" placeholder="Enter timeline title" type="text" { ...formikProps } />
          <FormField name="color_bg" label="Color" placeholder="Enter timeline color" type="text" { ...formikProps } />
          <FormSubmit handleSubmit={ handleSubmit } handleReset={ handleReset } dirty={ dirty } isSubmitting={ isSubmitting } />
        </form>
      ) }
    />
  )
}

export default TimelineForm
