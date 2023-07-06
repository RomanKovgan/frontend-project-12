/* eslint-disable */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  useEffect(() => {
    let didCancel = true;
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        if (didCancel) setFetching(false);
        dispatch(actions.setInitialState(data));
      } catch (err) {
        if (!err.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        if (err.response.status === 401) {
          auth.logOut();
        } else {
          toast.error(t('errors.network'));
        }
      }
    };
    fetchData();
    return () => { didCancel = false; };
  }, [dispatch, auth, t]);

  return fetching ? null : (
    <>
      <Modal />
      <div className="container h-100 shadow my-4 rounded overflow-hidden">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-3 border-end d-flex px-0  flex-column">
            <ChannelsList />
          </div>
          <div className="col h-100 p-0">
            <MessageList />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
