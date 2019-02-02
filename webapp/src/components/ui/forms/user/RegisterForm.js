import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import faker from "faker"
import { FormField, FormSubmit, FormApiErrors } from ".."
import "../Form.scss"

const RegisterForm = ({ register }) => {
  return (
    <Formik
      initialValues={ {
        email: faker.internet.email(),
        password: "xxxxxx",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      } }
      validationSchema={ Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
      }) }
      onSubmit={ (values, { setSubmitting, setErrors }) => {
        register({
          values,
          setErrors,
          setSubmitting,
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
          <FormField
            name="firstName"
            label="First name"
            placeholder="Enter your firstname"
            type="text"
            errors={ errors }
            { ...formikProps }
          />
          <FormField
            name="lastName"
            label="Last name"
            placeholder="Enter your lastname"
            type="text"
            errors={ errors }
            { ...formikProps }
          />
          <FormSubmit
            handleSubmit={ handleSubmit }
            handleReset={ handleReset }
            dirty={ dirty }
            isSubmitting={ isSubmitting }
            submitText="Register"
          />
          <FormApiErrors errors={ errors } />
        </form>
      ) }
    />
  )
}

export default RegisterForm
