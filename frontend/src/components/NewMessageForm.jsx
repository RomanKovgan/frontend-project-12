/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as filter from 'leo-profanity';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useApi, useAuth } from '../hooks/index';
import { messageSchema } from '../schemas';

const NewMessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { user: { username } } = useAuth();
  const api = useApi();
  const f = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageSchema,
    onSubmit: async ({ body }) => {
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
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  return (
    <Form noValidate onSubmit={f.handleSubmit} className="d-flex border rounded-2">
      <Form.Control
        name="body"
        placeholder={t('message.enterMessage')}
        aria-label={t('message.newMessage')}
        ref={inputRef}
        onChange={f.handleChange}
        onBlur={f.handleBlur}
        disabled={f.isSubmitting}
        value={f.values.body}
        className="border-0"
      />
      <Button
        variant="group-vertical"
        type="submit"
        disabled={!f.isValid || !f.dirty}
        className="border-0"
      >
        <ArrowRightCircleFill size={20} />
        <span className="visually-hidden">{t('message.submit')}</span>
      </Button>
    </Form>
  );
};

export default NewMessageForm;
