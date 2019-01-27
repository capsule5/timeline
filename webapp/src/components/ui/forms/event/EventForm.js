import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import faker from "faker"
import { FormField, FormSubmit, FormApiErrors } from ".."
import "../Form.scss"

const EventForm = ({ createEvent, timelines, closeDialog }) => {
  const timelinesOptions = timelines.map(({ id: value, title: text }) => ({ value, text }))
  const lastTimelineId = timelines[timelines.length - 1].id

  return (
    <Formik
      initialValues={ {
        title: faker.lorem.sentence(), // fake data
        dateYear: faker.random.number({ min: -3000, max: 2018 }), // fake data
        dateMonth: undefined,
        dateDay: undefined,
        dateReliability: 1,
        timelinesId: lastTimelineId,
      } }
      validationSchema={ Yup.object().shape({
        title: Yup.string()
          .min(3)
          .required(),
        dateYear: Yup.number().required(),
        dateMonth: Yup.number()
          .min(1)
          .max(12),
        dateDay: Yup.number()
          .min(1)
          .max(31),
        dateReliability: Yup.number(),
        timelinesId: Yup.number().required(),
      }) }
      onSubmit={ (values, { setSubmitting, setErrors }) => {
        createEvent({
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
          <FormField name="title" label="Title" type="text" errors={ errors } { ...formikProps } />
          <FormField name="dateYear" label="Year" type="number" errors={ errors } { ...formikProps } />
          <FormField name="dateMonth" label="Month" type="number" errors={ errors } { ...formikProps } />
          <FormField name="dateDay" label="Day" type="number" errors={ errors } { ...formikProps } />
          <FormField
            name="dateReliability"
            helperText="Date reliability"
            type="select"
            options={ [ 1, 2, 3 ] }
            errors={ errors }
            { ...formikProps }
          />
          <FormField
            name="timelinesId"
            helperText="select a timeline"
            type="select"
            options={ timelinesOptions }
            errors={ errors }
            { ...formikProps }
          />
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

export default EventForm
