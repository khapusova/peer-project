import enTexts from '@translations/en.json';

export const dummyInputProps = (formik) => [
  {
    type: 'text',
    id: '1',
    name: 'emailInput',
    use: 'assignment',
    labelText: enTexts.placeholders.email,
    onChange: formik.handleChange,
    value: formik.values.emailInput,
    invalid: `${Object.keys(formik.errors)[0]}` === 'emailInput'
  },
  {
    type: 'text',
    id: '2',
    name: 'passwordInput',
    use: 'assignment',
    labelText: enTexts.placeholders.password,
    onChange: formik.handleChange,
    value: formik.values.passwordInput,
    invalid: `${Object.keys(formik.errors)[0]}` === 'passwordInput'
  }
];
