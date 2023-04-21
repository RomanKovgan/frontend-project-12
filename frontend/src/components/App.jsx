import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ErrorPage from './ErrorPage';
import AuthorizationForm from './AuthorizationForm';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<AuthorizationForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;
