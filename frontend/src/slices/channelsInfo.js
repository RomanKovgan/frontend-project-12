/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

export const defaultChannelId = 1;

export const slise = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
    addChannel: (state, { payload }) => {
      const { channel } = payload;
      state.channels.push(channel);
    },
    removeChannel: (state, { payload }) => {
      const { channelId } = payload;
      const newChannels = [...state.channels];
      const filtredChannels = newChannels.filter(({ id }) => id !== channelId);
      state.channels = filtredChannels;
      if (state.currentChannelId === channelId) {
        state.currentChannelId = defaultChannelId;
      }
    },
    renameChannel: (state, { payload }) => {
      const { channelId, channelName } = payload;
      const channel = state.channels.find(({ id }) => id === channelId);
      channel.name = channelName;
    },
  },
});

export const { actions } = slise;

export default slise.reducer;
