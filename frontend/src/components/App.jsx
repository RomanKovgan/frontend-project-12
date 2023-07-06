/* eslint-disable */

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import NavigateBar from './NavigateBar';
import { AuthContext } from '../context/index';
import Registration from './Registration';
import ErrorPage from './ErrorPage';
import { useAuth } from '../hooks';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const loginedUser = JSON.parse(localStorage.getItem('userId'));
  const currentUser = loginedUser ? { username: loginedUser.username } : null;
  const [user, setUser] = useState(currentUser);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser({ username: data.username });
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    navigate(routes.loginPagePath());
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
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <Router>
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <NavigateBar />
        <Routes>
          <Route path={routes.mainPagePath()} element={<PrivateOutlet />}>
            <Route path="" element={<MainPage />} />
          </Route>
          <Route path={routes.errorPagePath()} element={<ErrorPage />} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPAgePath()} element={<Registration />} />
        </Routes>
        <ToastContainer autoClose={800} />
      </div>
    </AuthProvider>
  </Router>
);

export default App;
