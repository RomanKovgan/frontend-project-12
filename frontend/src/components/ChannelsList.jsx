/* eslint-disable */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices/index';


const Channel = ({
  channel, isCurrent, handleRemove, handleRename, handleChoose,
}) => {
  const { t } = useTranslation();
  const variant = isCurrent ? 'secondary' : null;
  return (
    <li key={channel.id} className="nav-item">
      {channel.removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              key={channel.id}
              onClick={handleChoose}
              variant={variant}
              type="button"
            >
              <span>#</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle split variant={variant}>
              <span className="visually-hidden">{t('channels.channelsControl')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRename(channel.id)}>{t('channels.rename')}</Dropdown.Item>
              <Dropdown.Item onClick={handleRemove(channel.id)}>{t('channels.remove')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            type="button"
            variant={variant}
            key={channel.id}
            onClick={handleChoose}
          >
            <span>#</span>
            {channel.name}
          </Button>
        )}
    </li>
  );
};

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels, currentChannelsId } = useSelector((state) => state.channelsInfo);

  const handleChooseChannel = (channelId) => () => {
    dispatch(actions.setCurrentChannel({ channelId }));
  };
  const handleAddChannel = () => {
    dispatch(actions.openModal({ type: 'addChannel'}));
  };
  const handleRenameChannel = (channelId) => () => {
    dispatch(actions.openModal({ type: 'renameChannel', channelId }));
  };
  const handleRemoveChannel = (channelId) => () => {
    dispatch(actions.openModal({ type: 'removeChannel', channelId }));
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <span>{t('channels.channels')}</span>
        <Button
          type="button"
          variant="group-vertical"
          onClick={handleAddChannel}
        >
          <Plus />
        </Button>
      </div>
      <ul className="nav flex-column h-100">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelsId}
            handleChoose={handleChooseChannel(channel.id)}
            handleRename={handleRenameChannel}
            handleRemove={handleRemoveChannel}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsList;
