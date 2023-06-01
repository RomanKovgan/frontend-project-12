import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions, defaultChannelId } from './channelsInfo';
import messagesInfo, { actions as messageInfoActions } from './messagesInfo';
import modal, { actions as modalActions } from './modal';

const actions = {
  ...channelsInfoActions,
  ...messageInfoActions,
  ...modalActions,
};

const reducer = combineReducers({
  channelsInfo,
  messagesInfo,
  modal,

});

const store = configureStore({
  reducer,
});

export { defaultChannelId, actions };
export default store;
