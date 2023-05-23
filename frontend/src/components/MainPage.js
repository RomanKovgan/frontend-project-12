/* eslint-disable functional/no-conditional-statements */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/index';

import routes from '../routes';
import ChannelsList from './ChannelsList';
import MessageList from './MessageList';
import { actions } from '../slices/index';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [fetching, setFetching] = useState(true);

  if (!auth.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let didCancel = true;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        console.log(data);
        if (didCancel) setFetching(false);
        dispatch(actions.setInitialState(data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    return () => { didCancel = false; };
  }, [dispatch]);

  return fetching ? null : (
    <>
      <h1>MainPage!</h1>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-4 col-md-2 d-flex flex-column">
            <ChannelsList />
          </div>
          <div className="col h-100">
            <MessageList />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
