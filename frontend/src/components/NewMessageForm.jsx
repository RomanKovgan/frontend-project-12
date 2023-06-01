/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useApi } from '../hooks/index';

const NewMessageForm = ({ channel }) => {
  const inputRef = useRef(null);
  const api = useApi();
  const f = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }) => {
      const message = {
        body,
        channelId: channel.id,
      };
      try {
        await api.sendMessage(message);
        f.resetForm();
      } catch (e) {
        console.log(e);
      }
      inputRef.current.focus();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  return (
    <Form onSubmit={f.handleSubmit}>
      <Form.Control
        name="body"
        placeholder="Enter yuor message..."
        ref={inputRef}
        onChange={f.handleChange}
        value={f.values.body}
      />
      <Button type="submit" />

    </Form>
  );
};

export default NewMessageForm;
