/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useApi } from '../../hooks/index';
import { getChannelById } from '../../slices/selectors';

const renameChannelMadal = ({ handleClose }) => {
  const inputRef = useRef();
  const api = useApi();
  const channelId = useSelector((state) => state.modal.channelId);
  const channel = useSelector(getChannelById(channelId));

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: async ({ name }) => {
      const data = { name, id: channelId };
      try {
        await api.renameChannel(data);
        handleClose();
      } catch (e) {
        inputRef.current.select();
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>RenameChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>RenameForm</Form.Label>
            <Form.Control
              name="name"
              id="name"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <div className="d-flex justify-content-between">
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

export default renameChannelMadal;
