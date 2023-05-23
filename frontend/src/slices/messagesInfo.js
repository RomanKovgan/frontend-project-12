/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */
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
    }),
});

export const { actions } = slice;
export default slice.reducer;
