import enTexts from '@translations/en.json';

export const inputsProps = (formik) => [
  {
    type: 'text',
    id: '10',
    name: 'oldPassword',
    use: 'assignment',
    labelText: enTexts.placeholders.oldPassword,
    onChange: formik.handleChange,
    value: formik.values.oldPassword,
    invalid: `${Object.keys(formik.errors)[0]}` === 'oldPassword'
  },
  {
    type: 'text',
    id: '11',
    name: 'newPassword',
    use: 'assignment',
    labelText: enTexts.placeholders.newPassword,
    onChange: formik.handleChange,
    value: formik.values.newPassword,
    invalid: `${Object.keys(formik.errors)[0]}` === 'newPassword'
  },
  {
    type: 'text',
    id: '12',
    name: 'confirmPassword',
    use: 'assignment',
    labelText: enTexts.placeholders.confirmPassword,
    onChange: formik.handleChange,
    value: formik.values.confirmPassword,
    invalid: `${Object.keys(formik.errors)[0]}` === 'confirmPassword'
  }
];
