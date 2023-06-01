/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useApi } from '../../hooks';

const RemoveChannelModal = ({ handleClose }) => {
  const api = useApi();
  const channelId = useSelector((state) => state.modal.channelId);
  const handleRemove = async () => {
    try {
      await api.removeChannel({ id: channelId });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </>

  );
};

export default RemoveChannelModal;
