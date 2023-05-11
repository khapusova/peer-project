import enTexts from '@translations/en.json';

export const dummyInputProps = (formik) => [
  {
    type: 'text',
    id: '7',
    name: 'password',
    use: 'assignment',
    labelText: enTexts.placeholders.password,
    onChange: formik.handleChange,
    value: formik.values.password,
    invalid: `${Object.keys(formik.errors)[0]}` === 'password'
  },
  {
    type: 'text',
    id: '8',
    name: 'confirmPassword',
    use: 'assignment',
    labelText: enTexts.placeholders.confirmPassword,
    onChange: formik.handleChange,
    value: formik.values.confirmPassword,
    invalid: `${Object.keys(formik.errors)[0]}` === 'confirmPassword'
  }
];
