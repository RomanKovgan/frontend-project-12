import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index';

const NavigateBar = () => {
  const { user, logOut } = useAuth();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      {user && <Button onClick={logOut}>Выйти</Button>}
    </Navbar>
  );
};

export default NavigateBar;
