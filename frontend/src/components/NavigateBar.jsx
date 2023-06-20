import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index';

const NavigateBar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/">{t('hexletChat')}</Navbar.Brand>
      {user && <Button onClick={logOut}>{t('logOut')}</Button>}
    </Navbar>
  );
};

export default NavigateBar;
