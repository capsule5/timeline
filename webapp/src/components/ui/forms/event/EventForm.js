import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { FormField, FormSubmit } from ".."
import "../Form.scss"

const EventForm = ({ createEvent, timelines }) => {
  const timelinesOptions = timelines.map(({ id: value, title: text }) => ({ value, text }))

  return (
    <Formik
      initialValues={ {
        title: "",
        date_year: "",
        date_month: "",
        date_day: "",
        date_reliability: 1,
        timelines_id: 1,
      } }
      validationSchema={ Yup.object().shape({
        title: Yup.string()
          .min(3)
          .required(),
        date_year: Yup.number().required(),
        date_month: Yup.number(),
        date_day: Yup.number(),
        date_reliability: Yup.number(),
        timelines_id: Yup.number().required(),
      }) }
      onSubmit={ (values, { setSubmitting }) => {
        createEvent(values)
        setSubmitting(false)
      } }
      render={ ({
        handleSubmit, handleReset, dirty, isSubmitting, ...formikProps
      }) => (
        <form onSubmit={ handleSubmit } className="form">
          <FormField name="title" label="Title" placeholder="Enter event title" type="text" { ...formikProps } />
          <FormField name="date_year" label="Year" placeholder="Enter event year" type="number" { ...formikProps } />
          <FormField name="date_month" label="Month" placeholder="Enter event month" type="number" { ...formikProps } />
          <FormField name="date_day" label="Day" placeholder="Enter event day" type="number" { ...formikProps } />
          <FormField
            name="date_reliability"
            helperText="Date reliability"
            type="select"
            options={ [ 1, 2, 3 ] }
            { ...formikProps }
          />
          <FormField
            name="timelines_id"
              // label="Timeline"
            helperText="select a timeline"
            type="select"
            options={ timelinesOptions }
            { ...formikProps }
          />
          <FormSubmit
            handleSubmit={ handleSubmit }
            handleReset={ handleReset }
            dirty={ dirty }
            isSubmitting={ isSubmitting }
          />
        </form>
      ) }
    />
  )
}

export default EventForm
