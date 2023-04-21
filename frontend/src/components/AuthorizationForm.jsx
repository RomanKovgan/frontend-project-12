import React from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const AuthorizationForm = () => (
  <Formik
    initialValues={{ name: '', password: '' }}
    validationSchema={Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    <Form>
      <Field name="name" type="text" />
      <ErrorMessage name="name" />

      <Field name="password" type="text" />
      <ErrorMessage name="password" />

      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export default AuthorizationForm;
