/* eslint-disable no-unused-expressions */
/* eslint-disable functional/no-expression-statements */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices';
import { useApi } from '../../hooks/index';

const AddChannelModal = ({ handleClose }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const api = useApi();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      try {
        handleClose();
        const { id } = await api.createChannel(values);
        dispatch(actions.setCurrentChannel({ channelId: id }));
      } catch (e) {
        inputRef.current.select();
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t('channelsName')}</Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
            />
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {t('submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModal;
