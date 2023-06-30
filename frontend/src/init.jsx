/* eslint-disable */
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/index';
import store, { actions } from './slices/index';
import App from './components/App';
import { ApiContext } from './context/index';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const socket = io();

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    let state = 'pending';
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;
      clearTimeout(timer);
      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }

      reject();
    });
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessages({ message: payload }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel({ channel: payload }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(actions.removeChannel({ channelId: id }));
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(actions.renameChannel({
      channelId: id,
      channelName: name,
    }));
  });

  const sendMessage = withAcknowledgement((...data) => {
    socket.volatile.emit('newMessage', ...data);
  });

  const createChannel = withAcknowledgement((...data) => {
    socket.volatile.emit('newChannel', ...data);
  });

  const removeChannel = withAcknowledgement((...data) => {
    socket.volatile.emit('removeChannel', ...data);
  });

  const renameChannel = withAcknowledgement((...data) => {
    socket.volatile.emit('renameChannel', ...data);
  });

  const sockets = {
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel,
  };
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ApiContext.Provider value={sockets}>
              <App />
            </ApiContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>

  );
};

export default init;
