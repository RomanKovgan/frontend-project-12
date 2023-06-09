/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import NavigateBar from './NavigateBar';
import { AuthContext } from '../context/index';
import Registration from './Registration';
import ErrorPage from './ErrorPage';
import { useAuth } from '../hooks';

const AuthProvider = ({ children }) => {
  const loginedUser = JSON.parse(localStorage.getItem('userId'));
  const currentUser = loginedUser ? { username: loginedUser.username } : null;
  const [user, setUser] = useState(currentUser);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser({ username: data.username });
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const getAuthHeader = () => {
    const dataUser = JSON.parse(localStorage.getItem('userId'));

    if (dataUser && dataUser.token) {
      return { Authorization: `Bearer ${dataUser.token}` };
    }

    return {};
  };

  const value = {
    user, logIn, logOut, getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <NavigateBar />
        <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="" element={<MainPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
