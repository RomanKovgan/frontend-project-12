/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { useApi, useAuth } from '../hooks/index';

const NewMessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { user: { username } } = useAuth();
  const api = useApi();
  const f = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }) => {
      filter.add(filter.getDictionary('ru'));
      const cleanMessage = filter.clean(body);
      const message = {
        body: cleanMessage,
        channelId: channel.id,
        username,
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
      <Button type="submit">
        {t('message.submit')}
      </Button>

    </Form>
  );
};

export default NewMessageForm;
