/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-expression-statements */
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import resources from './locales/index';
import store, { actions } from './slices/index';
import App from './components/App';
import { ApiContext } from './context/index';

const init = async () => {
  const i18n = i18next.createInstance();

  const socket = io();

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

  const sendMessage = (data) => {
    socket.emit('newMessage', data);
  };

  const createChannel = (data) => {
    socket.emit('newChannel', data);
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', id);
  };

  const renameChannel = (data) => {
    socket.emit('renameChannel', data);
  };

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
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={sockets}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
