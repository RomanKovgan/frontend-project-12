const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsInfo;
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  return currentChannel;
};

const channelsInfo = (state) => state.channelsInfo;

const getChannelById = (channelId) => (state) => {
  const { channels } = state.channelsInfo;
  const channelById = channels.find(({ id }) => channelId === id);
  return channelById;
};

const getChannelsNames = (state) => {
  const { channels } = state.channelsInfo;
  const channelsNames = channels.map(({ name }) => name);
  return channelsNames;
};

const getMessagesForChannel = (state) => {
  const { currentChannelId } = state.channelsInfo;
  const { messages } = state.messagesInfo;
  const messagesForChanell = messages.filter((message) => message.channelId === currentChannelId);
  return messagesForChanell;
};

export {
  getMessagesForChannel,
  getChannelsNames,
  getCurrentChannel,
  channelsInfo,
  getChannelById,
};
