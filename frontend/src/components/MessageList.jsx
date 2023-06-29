import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewMessageForm from './NewMessageForm';
import { getCurrentChannel, getMessagesForChannel } from '../slices/selectors';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{`${username} `}</b>
    :
    {` ${body}`}
  </div>
);

const MessageList = () => {
  const { t } = useTranslation();
  const channel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessagesForChannel);

  return (
    <div className="d-flex flex-column h-100 ">
      <div className="bg-light">
        <div className="m-2 p-4 ">
          <b>{`#${channel?.name}`}</b>
          <br />
          <span className="text-muted">{`${messages.length} ${t('message.messageCount', { count: messages.length })}`}</span>
        </div>
      </div>
      <div className="px-5 overflow-auto">
        {messages.map(({ id, username, body }) => (
          <Message
            key={id}
            username={username}
            body={body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default MessageList;
