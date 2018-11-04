import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"

const EventForm = ({ createEvent }) => (
  <>
    <h1>new event:</h1>
    <Formik
      initialValues={ { title: "", date_year: "" } }
      validationSchema={ Yup.object().shape({
        title: Yup.string()
          .min(3)
          .required(),
        date_year: Yup.number()
          .required(),
      }) }
      onSubmit={ (values, { setSubmitting }) => {
        createEvent(values)
        setSubmitting(false)
      } }
      render={ ({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleSubmit,
        handleBlur,
        handleReset,
        isSubmitting,
      }) => (
        <form onSubmit={ handleSubmit }>
          <div className="formGroup">
            <label htmlFor="title">
              <span>Title</span>
            </label>
            <input
              id="title"
              placeholder="Enter event title"
              type="text"
              value={ values.title }
              onChange={ handleChange }
              onBlur={ handleBlur }
              className={ errors.title && touched.title ? "text-input error" : "text-input" }
            />
            {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
          </div>
          <div className="formGroup">
            <label htmlFor="date_year">
              <span>Year</span>
            </label>
            <input
              id="date_year"
              placeholder="Enter event year"
              type="number"
              value={ values.date_year }
              onChange={ handleChange }
              onBlur={ handleBlur }
              className={ errors.date_year && touched.date_year ? "text-input error" : "text-input" }
            />
            {errors.date_year && touched.date_year && <div className="input-feedback">{errors.date_year}</div>}
          </div>
          <div>
            <button type="button" className="outline" onClick={ handleReset } disabled={ !dirty || isSubmitting }>
              Reset
            </button>
            <button type="submit" disabled={ isSubmitting }>
              Submit
            </button>
          </div>
        </form>
      ) }
    />
  </>
)

export default EventForm
