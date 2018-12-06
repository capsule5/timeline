import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import faker from "faker"
import { FormField, FormSubmit } from ".."
import "../Form.scss"

const TimelineForm = ({ createTimeline, closeDialog }) => {
  return (
    <Formik
      initialValues={ {
        title: "",
        color_bg: faker.internet.color(),
      } }
      validationSchema={ Yup.object().shape({
        title: Yup.string()
          .min(3)
          .required(),
        color_bg: Yup.string().matches(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "Color must be a valid hexadecimal format (#FF00CC)"
        ),
      }) }
      onSubmit={ (values, { setSubmitting }) => {
        createTimeline({ values, onSuccess: closeDialog })
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
