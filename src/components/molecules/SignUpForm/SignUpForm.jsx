import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Button, Flex, Typography } from '@mixins';
import { InputsForm } from '@molecules';
import enTexts from '@translations/en.json';
import { signUpSchema } from '@utils';
import { ErrorMessage, TypographyWithButton } from '@atoms';
import { withFlexProps } from '@hocs';
import { api } from '@store/authorization/api';
import { func } from 'prop-types';
import { dummyInputProps } from './SignUpForm.layoutProps';

const SignUpForm = ({ setPasswordVerificationMode }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      emailInstitution: ''
    },
    validationSchema: signUpSchema,
    onSubmit: async (data) => {
      const responce = await api.login();
      if (responce.data.map((el) => el.email).includes(data.emailInstitution)) {
        setError();
      } else {
        setPasswordVerificationMode(data);
      }
    }
  });

  const setError = () => {
    formik.errors.emailInstitution = enTexts.errorMessages.emailIsTaken;
  };

  return (
    <FormikProvider value={formik}>
      <Flex as={Form} display="block" width="100%">
        <Flex display="block" position="relative">
          <InputsForm
            inputsProps={dummyInputProps(formik)}
            marginBetween="40px"
          />
          <ErrorMessage display="block" formik={formik} />
          <Flex marginBottom="16px">
            <Button
              backgroundColor={formik.isValid ? 'blueCta' : 'blueLight'}
              paddingY="13px"
              type="submit"
              width="100%"
            >
              <Typography color="white" variant="w700-s16">
                {enTexts.buttonNames.continue}
              </Typography>
            </Button>
          </Flex>
          <TypographyWithButton
            alignItems="center"
            buttonText={enTexts.buttonNames.logIn}
            handleButtonClick={() => {}}
            justifyContent="center"
            typographyText={enTexts.claims.alreadyOnPeeref}
            variant="w700-s14"
          />
        </Flex>
      </Flex>
    </FormikProvider>
  );
};

SignUpForm.propTypes = {
  setPasswordVerificationMode: func.isRequired
};

export default withFlexProps(SignUpForm);
