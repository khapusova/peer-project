import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Typography } from '@mixins';
import { InputsForm } from '@molecules';
import enTexts from '@translations/en.json';
import { ROUTES } from '@constants';
import { passwordVerificationSchema } from '@utils';
import { ErrorMessage, TypographyWithButton } from '@atoms';
import { withFlexProps } from '@hocs';
import { shape, string } from 'prop-types';
import { addNewAuthor, login } from '@store/authorization/duck';
import { dummyInputProps } from './PasswordVerificationForm.layoutProps';

const PasswordVerificationForm = ({ generalData }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: passwordVerificationSchema,
    onSubmit: async (data) => {
      const allData = { ...generalData, ...data };
      await dispatch(addNewAuthor(allData));
      await handleSubmitForm();
    }
  });

  const handleSubmitForm = async () => {
    const { password } = formik.values;
    const loginData = {
      email: generalData.emailInstitution,
      password
    };

    const responce = await dispatch(login(loginData));
    if (responce.error) {
      formik.errors.emailInput = responce?.payload?.errorMessage;
    } else {
      navigate(ROUTES.onboarding, { state: { from: 'passwordVerification' } });
    }
  };

  return (
    <FormikProvider value={formik}>
      <Flex as={Form} display="block" width="100%">
        <Flex display="block" position="relative">
          <InputsForm
            inputsProps={dummyInputProps(formik)}
            marginBetween="40px"
          />
          <ErrorMessage display="block" formik={formik} marginY="163px" />
          <Flex marginBottom="16px">
            <Button
              backgroundColor={formik.isValid ? 'blueCta' : 'blueLight'}
              paddingY="13px"
              type="submit"
              width="100%"
            >
              <Typography color="white" variant="w700-s16">
                {enTexts.buttonNames.register}
              </Typography>
            </Button>
          </Flex>
          <TypographyWithButton
            alignItems="center"
            buttonText={enTexts.buttonNames.logIn}
            handleButtonClick={() => {
              navigate(ROUTES.signIn);
            }}
            justifyContent="center"
            typographyText={enTexts.claims.alreadyOnPeeref}
            variant="w700-s14"
          />
        </Flex>
      </Flex>
    </FormikProvider>
  );
};

PasswordVerificationForm.propTypes = {
  generalData: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    emailInstitution: string.isRequired
  }).isRequired
};

export default withFlexProps(PasswordVerificationForm);
