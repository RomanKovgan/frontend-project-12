/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { actions } from '../../slices/index';
import AddChannelModal from './AddChannelModal';
import RenameChannelMadal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const modalsMap = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelMadal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(actions.closeModal());
  };
  const isOpened = useSelector((state) => state.modal.isOpened);
  const modalType = useSelector((state) => state.modal.type);
  const Component = modalsMap[modalType];

  return (
    <BootstrapModal show={isOpened} onHide={handleClose}>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
