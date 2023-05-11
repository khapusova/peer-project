import enTexts from '@translations/en.json';

export const dummyInputProps = (formik, editPhoneMode) => [
  {
    type: 'tel',
    id: '1',
    name: 'phone',
    labelText: enTexts.placeholders.phone,
    onChange: formik.handleChange,
    invalid: `${Object.keys(formik.errors)[0]}` === 'phone'
  },
  {
    type: 'text',
    id: '2',
    name: 'website',
    use: 'assignment',
    labelText: enTexts.placeholders.website,
    onChange: formik.handleChange,
    value: formik.values.website,
    invalid: `${Object.keys(formik.errors)[0]}` === 'website',
    disabled: editPhoneMode
  },
  {
    type: 'text',
    id: '3',
    name: 'linkedIn',
    use: 'assignment',
    placeholder: enTexts.placeholders.urlOfLinkedIn,
    labelText: enTexts.placeholders.linkedIn,
    onChange: formik.handleChange,
    value: formik.values.linkedIn,
    invalid: `${Object.keys(formik.errors)[0]}` === 'linkedIn',
    disabled: editPhoneMode
  },
  {
    type: 'text',
    id: '4',
    name: 'orcid',
    use: 'assignment',
    placeholder: enTexts.placeholders.urlOfLinkedIn,
    labelText: enTexts.placeholders.orcid,
    onChange: formik.handleChange,
    value: formik.values.orcid,
    invalid: `${Object.keys(formik.errors)[0]}` === 'orcid',
    disabled: editPhoneMode
  }
];
