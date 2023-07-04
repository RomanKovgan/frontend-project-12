/* eslint-disable */

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/index';
import routes from '../routes';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        navigate('/', { replace: true });
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response?.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        } else {
          toast.error(t('errors.network'));
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const {
    handleSubmit, handleChange, isSubmitting, values, touched, errors,
  } = formik;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6 col-sm-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={handleSubmit} className="p-3">
              <h1 className="text-center mb-4">{ t('login.login')}</h1> 
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    onChange={handleChange}
                    value={values.username}
                    placeholder={t('login.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={(errors.username && touched.username) || authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{t(errors.username)}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder={t('login.password')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={(touched.password && errors.password) || authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{t('login.error')}</Form.Control.Feedback>
                </Form.Group>
                <div className=" d-flex justify-content-between ">
                  <Button type="submit" className="mt-3" variant="outline-primary">{t('login.submit')}</Button>
                  <Button type="onClick" className="mt-3" variant="outline-primary">
                    <Link to="/signup" className="text-decoration-none" >{t('login.registration')}</Link>
                  </Button>
                </div>
              </Form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
