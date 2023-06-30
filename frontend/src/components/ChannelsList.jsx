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
  const variant = isCurrent ? 'info' : null;
  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              key={channel.id}
              onClick={handleChoose}
              variant={variant}
              type="button"
              className="w-100 rounded-0 text-start text-truncate"
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
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
            className="w-100 text-start rounded-0"
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        )}
    </li>
  );
};

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
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
      <div className="d-flex justify-content-between m-2  ps-4  pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          onClick={handleAddChannel}
          className="p-0 m-1 text-bg-primary"
        >
          <Plus />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-fill nav-pills ps-2 m-2 h-100 overflow-auto d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
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
