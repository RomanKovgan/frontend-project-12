/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, channelId } = payload;
      state.isOpened = true;
      state.type = type;
      state.channelId = channelId;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
