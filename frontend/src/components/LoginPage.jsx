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
        localStorage.setItem('userId', JSON.stringify(res.data.token));
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
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset disabled={formik.isSubmitting}>
              <Form.Group>
                <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={authFailed}
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
                <Form.Control.Feedback type="invalid">{t('login.error')}</Form.Control.Feedback>
              </Form.Group>
              <div className=" d-flex justify-content-between ">
                <Button type="submit" className="mt-3" variant="outline-primary">{t('login.submit')}</Button>
                <Button type="onClick" className="mt-3" variant="outline-primary">
                  <Link to="/signup">{t('login.registration')}</Link>
                </Button>
              </div>

            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
