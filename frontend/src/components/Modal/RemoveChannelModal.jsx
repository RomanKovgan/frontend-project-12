/* eslint-disable */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks';

const RemoveChannelModal = ({ handleClose }) => {
  const { t } = useTranslation();
  const api = useApi();
  const channelId = useSelector((state) => state.modal.channelId);
  const handleRemove = async () => {
    try {
      await api.removeChannel({ id: channelId });
      toast.success(t('modals.removed'));
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            {t('modals.delete')}
          </Button>
        </div>
      </Modal.Body>
    </>

  );
};

export default RemoveChannelModal;
