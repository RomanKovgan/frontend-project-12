/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../hooks/index';
import { getChannelById } from '../../slices/selectors';

const renameChannelMadal = ({ handleClose }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const api = useApi();
  const channelId = useSelector((state) => state.modal.channelId);
  const channel = useSelector(getChannelById(channelId));

  useEffect(() => {
    setTimeout(() => inputRef.current.select()); 
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: async ({ name }) => {
      const data = { name, id: channelId };
      try {
        await api.renameChannel(data);
        toast.success(t('modals.renamed'));
        handleClose();
      } catch (e) {
        inputRef.current.select();
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.rename')}</label>
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.name) || t(formik.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default renameChannelMadal;
