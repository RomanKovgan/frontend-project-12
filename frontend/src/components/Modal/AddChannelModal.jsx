/* eslint-disable no-unused-expressions */
/* eslint-disable functional/no-expression-statements */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { actions } from '../../slices';
import { useApi } from '../../hooks/index';

const AddChannelModal = ({ handleClose }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const api = useApi();

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
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Channels name</Form.Label>
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
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannelModal;
