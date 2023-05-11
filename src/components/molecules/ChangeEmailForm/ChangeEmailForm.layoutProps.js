import enTexts from '@translations/en.json';

export const inputsProps = (formik) => [
  {
    type: 'text',
    id: '13',
    name: 'oldEmail',
    use: 'assignment',
    labelText: enTexts.placeholders.oldEmail,
    onChange: formik.handleChange,
    value: formik.values.oldEmail,
    invalid: `${Object.keys(formik.errors)[0]}` === 'oldEmail'
  },
  {
    type: 'text',
    id: '14',
    name: 'password',
    use: 'assignment',
    labelText: enTexts.placeholders.password,
    onChange: formik.handleChange,
    value: formik.values.password,
    invalid: `${Object.keys(formik.errors)[0]}` === 'password'
  },
  {
    type: 'text',
    id: '15',
    name: 'newEmail',
    use: 'assignment',
    labelText: enTexts.placeholders.newEmail,
    onChange: formik.handleChange,
    value: formik.values.newEmail,
    invalid: `${Object.keys(formik.errors)[0]}` === 'newEmail'
  }
];
