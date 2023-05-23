/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

const NewMessageForm = () => {
  const inputRef = useRef(null);
  const f = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={f.handleSubmit}>
      <Form.Control
        name="message"
        placeholder="Enter yuor message..."
        ref={inputRef}
        onChange={f.handleChange}
        value={f.values.message}
      />
      <Button type="submit" />

    </Form>
  );
};

export default NewMessageForm;
