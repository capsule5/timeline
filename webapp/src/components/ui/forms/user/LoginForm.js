import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { FormField, FormSubmit, FormApiErrors } from ".."
import "../Form.scss"

const LoginForm = ({ login }) => {
  return (
    <Formik
      initialValues={ {
        email: "test@test.com",
        password: "xxxxxx",
      } }
      validationSchema={ Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      }) }
      onSubmit={ (values, { setSubmitting, setErrors }) => {
        login({
          values,
          setErrors,
          setSubmitting,
          // On success we don't need to call closeDialog
          // Dialog is removed when navAnon is unmout after user auth
          // see App.js
          onSuccess: () => {},
        })
      } }
      render={ ({
        handleSubmit, handleReset, dirty, isSubmitting, errors, ...formikProps
      }) => (
        <form onSubmit={ handleSubmit } className="form">
          <FormField
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="text"
            errors={ errors }
            { ...formikProps }
          />
          <FormField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            errors={ errors }
            { ...formikProps }
          />
          <FormSubmit
            handleSubmit={ handleSubmit }
            handleReset={ handleReset }
            dirty={ dirty }
            isSubmitting={ isSubmitting }
            submitText="Login"
          />
          <FormApiErrors errors={ errors } />
        </form>
        
      ) }
    />
  )
}

export default LoginForm
