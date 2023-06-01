import React from 'react';
import { useSelector } from 'react-redux';
import NewMessageForm from './NewMessageForm';
import { getCurrentChannel, getMessagesForChannel } from '../slices/selectors';

const Message = ({ username, body }) => (
  <div>
    <span>{username}</span>
    :
    {body}
  </div>
);

const MessageList = () => {
  const channel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForChannel);

  return (
    <div className="d-flex flex-column">
      <div className="bg-light">
        <div>{`#${channel?.name}`}</div>
        <span>{`${messages.length} messages`}</span>
      </div>
      <div>
        {messages.map(({ id, username, body }) => (
          <Message
            key={id}
            username={username}
            body={body}
          />
        ))}
      </div>
      <div>
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default MessageList;
