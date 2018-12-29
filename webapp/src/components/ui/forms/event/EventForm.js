import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import faker from "faker"
import { FormField, FormSubmit } from ".."
import "../Form.scss"

const EventForm = ({ createEvent, timelines, closeDialog }) => {
  const timelinesOptions = timelines.map(({ id: value, title: text }) => ({ value, text }))
  const lastTimelineId = timelines[timelines.length - 1].id

  return (
    <Formik
      initialValues={ {
        title: faker.lorem.sentence(), // fake data
        date_year: faker.random.number({ min: -3000, max: 2018 }), // fake data
        date_month: undefined,
        date_day: undefined,
        date_reliability: 1,
        timelines_id: lastTimelineId,
      } }
      validationSchema={ Yup.object().shape({
        title: Yup.string()
          .min(3)
          .required(),
        date_year: Yup.number().required(),
        date_month: Yup.number()
          .min(1)
          .max(12),
        date_day: Yup.number()
          .min(1)
          .max(31),
        date_reliability: Yup.number(),
        timelines_id: Yup.number().required(),
      }) }
      onSubmit={ (values, { setSubmitting }) => {
        createEvent({ values, onSuccess: closeDialog })
        setSubmitting(false)
      } }
      render={ ({
        handleSubmit, handleReset, dirty, isSubmitting, ...formikProps
      }) => (
        <form onSubmit={ handleSubmit } className="form">
          <FormField name="title" label="Title" type="text" { ...formikProps } />
          <FormField name="date_year" label="Year" type="number" { ...formikProps } />
          <FormField name="date_month" label="Month" type="number" { ...formikProps } />
          <FormField name="date_day" label="Day" type="number" { ...formikProps } />
          <FormField
            name="date_reliability"
            helperText="Date reliability"
            type="select"
            options={ [ 1, 2, 3 ] }
            { ...formikProps }
          />
          <FormField
            name="timelines_id"
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
            submitText="Create"
          />
        </form>
      ) }
    />
  )
}

export default EventForm
