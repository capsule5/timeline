import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import faker from "faker"
import { FormField, FormSubmit, FormApiErrors } from ".."
import "../Form.scss"

const TimelineForm = ({ createTimeline, closeDialog }) => {
  return (
    <Formik
      initialValues={ {
        title: "",
        colorBg: faker.internet.color(),
      } }
      validationSchema={ Yup.object().shape({
        title: Yup.string()
          .min(3)
          .required(),
        colorBg: Yup.string().matches(
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "Color must be a valid hexadecimal format (#FF00CC)"
        ),
      }) }
      onSubmit={ (values, { setSubmitting, setErrors }) => {
        createTimeline({
          values,
          setErrors,
          setSubmitting,
          onSuccess: closeDialog,
        })
      } }
      render={ ({
        handleSubmit, handleReset, dirty, isSubmitting, errors, ...formikProps
      }) => (
        <form onSubmit={ handleSubmit } className="form">
          <FormField name="title" label="Title" placeholder="Enter timeline title" type="text" errors={ errors } { ...formikProps } />
          <FormField name="colorBg" label="Color" placeholder="Enter timeline color" type="text" errors={ errors } { ...formikProps } />
          <FormSubmit
            handleSubmit={ handleSubmit }
            handleReset={ handleReset }
            dirty={ dirty }
            isSubmitting={ isSubmitting }
            submitText="Create"
          />
          <FormApiErrors errors={ errors } />
        </form>
      ) }
    />
  )
}

export default TimelineForm
