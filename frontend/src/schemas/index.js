import * as yup from 'yup';

const loginSchema = yup.object({
  name: yup.string()
    .required('Required'),
  password: yup.string()
    .required('Required'),
});

const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('registration.required')
    .min(3, 'registration.usernamePattern')
    .max(20, 'registration.usernamePattern'),
  password: yup
    .string()
    .trim()
    .required('registration.required')
    .min(6, 'registration.passMin'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', 'registration.passMustMatch', (value, context) => value === context.parent.password),
});

const messageSchema = yup.object().shape({
  body: yup
    .string()
    .trim()
    .required('Required'),
});

const addChannelSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('modals.required')
    .min(3, 'modals.min')
    .max(20, 'modals.max')
    .notOneOf(channels, 'modals.unique'),
});

export {
  registrationSchema,
  loginSchema,
  messageSchema,
  addChannelSchema,
};
