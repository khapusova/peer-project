import enTexts from '@translations/en.json';

export const inputProps = (formik) => ({
  type: 'text',
  id: '3',
  name: 'emailInput',
  use: 'assignment',
  labelText: enTexts.placeholders.email,
  onChange: formik.handleChange,
  value: formik.values.emailInput,
  invalid: !!Object.keys(formik.errors)[0]
});
