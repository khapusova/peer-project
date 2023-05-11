import enTexts from '@translations/en.json';

export const dummyInputProps = (formik) => [
  {
    type: 'text',
    id: '4',
    name: 'firstName',
    use: 'assignment',
    labelText: enTexts.placeholders.firstName,
    onChange: formik.handleChange,
    value: formik.values.firstName,
    invalid: `${Object.keys(formik.errors)[0]}` === 'firstName'
  },
  {
    type: 'text',
    id: '5',
    name: 'lastName',
    use: 'assignment',
    labelText: enTexts.placeholders.lastName,
    onChange: formik.handleChange,
    value: formik.values.lastName,
    invalid: `${Object.keys(formik.errors)[0]}` === 'lastName'
  },
  {
    type: 'text',
    id: '6',
    name: 'emailInstitution',
    use: 'assignment',
    labelText: enTexts.placeholders.emailInstitution,
    onChange: formik.handleChange,
    value: formik.values.emailInstitution,
    invalid: `${Object.keys(formik.errors)[0]}` === 'emailInstitution'
  }
];
