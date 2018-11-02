import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"

const EventForm = () => (
  <>
    <h1>new event:</h1>
    <Formik
      initialValues={ { title: "" } }
      validationSchema={ Yup.object().shape({
        title: Yup.string()
          .min(3)
          .required(),
      }) }
      onSubmit={ (values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 1000)
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
            <label htmlFor="firstName">
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
