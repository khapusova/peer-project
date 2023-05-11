import enTexts from '@translations/en.json';

export const dummyInputProps = (formik) => [
  {
    type: 'text',
    id: '1',
    name: 'firstName',
    use: 'assignment',
    labelText: enTexts.placeholders.firstName,
    onChange: formik.handleChange,
    value: formik.values.firstName,
    invalid: `${Object.keys(formik.errors)[0]}` === 'firstName'
  },
  {
    type: 'text',
    id: '2',
    name: 'lastName',
    use: 'assignment',
    labelText: enTexts.placeholders.lastName,
    onChange: formik.handleChange,
    value: formik.values.lastName,
    invalid: `${Object.keys(formik.errors)[0]}` === 'lastName'
  },
  {
    type: 'text',
    id: '3',
    name: 'institution',
    use: 'assignment',
    labelText: enTexts.placeholders.institution,
    onChange: formik.handleChange,
    value: formik.values.institution,
    invalid: `${Object.keys(formik.errors)[0]}` === 'institution'
  },
  {
    type: 'text',
    id: '4',
    name: 'positionTitle',
    use: 'assignment',
    labelText: enTexts.placeholders.positionTitle,
    onChange: formik.handleChange,
    value: formik.values.positionTitle,
    invalid: `${Object.keys(formik.errors)[0]}` === 'positionTitle'
  },
  {
    type: 'text',
    id: '5',
    name: 'bio',
    use: 'assignment',
    labelText: enTexts.claims.bio,
    placeholder: enTexts.placeholders.tellUs,
    onChange: formik.handleChange,
    value: formik.values.bio,
    invalid: `${Object.keys(formik.errors)[0]}` === 'bio'
  }
];
