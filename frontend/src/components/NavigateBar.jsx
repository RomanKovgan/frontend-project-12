/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index';

const NavigateBar = () => {
  const { t, i18n } = useTranslation();
  const { user, logOut } = useAuth();
  // const notify = (item) => toast(`Languege change to ${item}`);

  const change = (lng) => i18n.changeLanguage(lng);

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/">{t('navbar.hexletChat')}</Navbar.Brand>
      <div>
        <Button type="button" onClick={() => change('en')}>{t('navbar.en')}</Button>
        <Button type="button" onClick={() => change('ru')}>{t('navbar.ru')}</Button>
      </div>
      {user && <Button onClick={logOut}>{t('navbar.logOut')}</Button>}
    </Navbar>
  );
};

export default NavigateBar;
