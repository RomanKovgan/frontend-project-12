/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/index';

import routes from '../routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div id="mainPage">
      <h1>MainPage!</h1>
    </div>
  );
};

export default MainPage;
