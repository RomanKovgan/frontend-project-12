import React from 'react';
import { useSelector } from 'react-redux';

const ChannelsList = () => {
  const { channels } = useSelector((state) => state.channelsInfo);
  return (
    <ul className="flex-column">
      {channels.map((channel) => (
        <li key={channel.id}>
          {channel.name}
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
