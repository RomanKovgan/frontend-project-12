/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsInfoActions } from './channelsInfo';

export const slice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, { payload }) => {
      const { message } = payload;
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => builder
    .addCase(channelsInfoActions.setInitialState, (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    })
    .addCase(channelsInfoActions.removeChannel, (state, { payload }) => {
      const { channelId } = payload;
      const filtredMessages = state.messages.filter((message) => message.channelId !== channelId);
      state.messages = filtredMessages;
    }),
});

export const { actions } = slice;
export default slice.reducer;
