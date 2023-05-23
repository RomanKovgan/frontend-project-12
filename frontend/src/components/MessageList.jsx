import React from 'react';
import { useSelector } from 'react-redux';
import NewMessageForm from './NewMessageForm';

const MessageList = () => {
  const { messages } = useSelector((state) => state.messagesInfo);
  return (
    <div className="d-flex flex-column">
      {messages ? messages.map(({ id, body }) => (
        <div key={id}>
          {body}
        </div>
      )) : null}
      <div>
        <NewMessageForm />
      </div>
    </div>
  );
};

export default MessageList;
