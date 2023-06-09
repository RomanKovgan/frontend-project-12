/* eslint-disable functional/no-let */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/index';

import routes from '../routes';
import ChannelsList from './ChannelsList';
import MessageList from './MessageList';
import Modal from './Modal/Modal';
import { actions } from '../slices/index';

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  // if (!auth.user) {
  //   return <Navigate to="/login" replace />;
  // }

  useEffect(() => {
    let didCancel = true;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        if (didCancel) setFetching(false);
        dispatch(actions.setInitialState(data));
      } catch (err) {
        if (!err.isAxiosError) {
          return;
        }
        if (err.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchData();
    return () => { didCancel = false; };
  }, [dispatch, auth, navigate]);
  console.log(fetching);

  return fetching ? null : (
    <>
      <Modal />
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
