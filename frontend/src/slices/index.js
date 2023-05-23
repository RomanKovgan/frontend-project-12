import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsInfo, { actions as channelsInfoActions, defaultChannelId } from './channelsInfo';
import messagesInfo, { actions as messageInfoActions } from './messagesInfo';

export const actions = {
  ...channelsInfoActions,
  ...messageInfoActions,
};

const reducer = combineReducers({
  channelsInfo,
  messagesInfo,
});

const store = configureStore({
  reducer,
});

export { defaultChannelId };
export default store;
