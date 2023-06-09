import * as yup from 'yup';

const loginSchema = yup.object({
  name: yup.string()
    .required('Required'),
  password: yup.string()
    .required('Required'),
});

const registrationShema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('required')
    .min(3, 'must be 3 to 20 characters')
    .max(20, 'must be 3 to 20 characters'),
  password: yup
    .string()
    .trim()
    .required('required')
    .min(6, 'passMin 6 characters'),
  confirmPassword: yup
    .string()
    .test('confirmPassword', 'mustMatch', (value, context) => value === context.parent.password),
});

export { registrationShema, loginSchema };
