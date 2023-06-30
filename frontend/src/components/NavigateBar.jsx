/* eslint-disable */
import React from 'react';
import { Button, ButtonGroup, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index';

const NavigateBar = () => {
  const { t, i18n } = useTranslation();
  const { user, logOut } = useAuth();

  const change = (lng) => i18n.changeLanguage(lng);

  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="justify-content-between">
      <Navbar.Brand as={Link} to="/">{t('navbar.hexletChat')}</Navbar.Brand>
      <ButtonGroup className="border">
        <Button type="button" onClick={() => change('en')}>{t('navbar.en')}</Button>
        <Button type="button" onClick={() => change('ru')}>{t('navbar.ru')}</Button>
      </ButtonGroup>
      {user && <Button onClick={logOut}>{t('navbar.logOut')}</Button>}
    </Navbar>
  );
};

export default NavigateBar;
