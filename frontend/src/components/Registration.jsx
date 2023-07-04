/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import routes from '../routes';
import { registrationSchema } from '../schemas/index';

const Registration = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [signupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }) => {
      setSignupFailed(false);
      try {
        const res = await axios.post(routes.signupPath(), { username, password });
        auth.logIn(res.data);
        navigate('/');
      } catch (e) {
        if (e.response.status === 409) {
          setSignupFailed(true);
          inputRef.current.select();
          return;
        }
        throw e;
      }
    },
    validationSchema: registrationSchema,
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6 col-sm-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={handleSubmit} className="p-3">
                <h1 className="text-center mb-4">{ t('registration.registration')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    onChange={handleChange}
                    value={values.username}
                    placeholder={t('registration.username')}
                    name="username"
                    id="username"
                    ref={inputRef}
                    autoComplete="username"
                    isInvalid={(errors.username && touched.username) || signupFailed}
                    required
                    
                  />
                  <Form.Label htmlFor="username">{t('registration.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{signupFailed ? t('registration.alreadyExists') : t(errors.username)}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder={t('registration.password')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={(errors.password && touched.password) || signupFailed}
                    required
                    
                  />
                  <Form.Label htmlFor="password">{t('registration.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{t(errors.password)}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    placeholder={t('registration.confirmation')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    required
                    isInvalid={(errors.confirmPassword && touched.confirmPassword) || signupFailed}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('registration.confirmation')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{t(errors.confirmPassword)}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary w-100" onClick={handleSubmit}>
                  { t('registration.submit') }
                </Button>
              </Form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Registration;
