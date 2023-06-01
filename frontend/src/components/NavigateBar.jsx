import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index';

const NavigateBar = () => {
  const { logOut } = useAuth();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/">Chat</Navbar.Brand>
      <Button onClick={logOut}>Выйти</Button>
    </Navbar>
  );
};

export default NavigateBar;
