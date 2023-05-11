import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Button, Flex, Typography } from '@mixins';
import { InputsForm } from '@molecules';
import enTexts from '@translations/en.json';
import { signInSchema } from '@utils';
import { ROUTES, LOCALSTORAGE } from '@constants';
import { ErrorMessage, TypographyWithButton } from '@atoms';
import { withFlexProps } from '@hocs';
import { useDispatch, useSelector } from 'react-redux';
import { login, getActualUserInfo } from '@store/authorization/duck';
import { getDataFromLS } from '@store/localStorage';
import { dummyInputProps } from './SignInForm.layoutProps';

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.authorization.userInfo);

  const formik = useFormik({
    initialValues: {
      emailInput: '',
      passwordInput: ''
    },
    validationSchema: signInSchema,
    onSubmit: () => handleSubmitForm()
  });

  const handleSubmitForm = async () => {
    const { emailInput: email, passwordInput: password } = formik.values;
    const loginData = {
      email,
      password
    };

    const responce = await dispatch(login(loginData));
    if (responce.error) {
      formik.errors.emailInput = responce?.payload?.errorMessage;
    } else {
      const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
      const id = parseInt(token[token.length - 1], 10);
      await dispatch(getActualUserInfo({ token, id }));
      if (userInfo?.passedOnboarding) {
        navigate(ROUTES.profile);
      } else {
        navigate(ROUTES.onboarding);
      }
    }
  };

  return (
    <FormikProvider value={formik}>
      <Flex as={Form} display="block" width="100%">
        <Flex display="block" position="relative">
          <InputsForm
            inputsProps={dummyInputProps(formik)}
            marginBetween="48px"
          />
          <Button
            backgroundColor="none"
            bottom="-28px"
            color="blueCta"
            position="absolute"
            right="0px"
            type="button"
          >
            <Typography variant="w700-s14">
              {enTexts.claims.forgotPassword}
            </Typography>
          </Button>
        </Flex>
        <ErrorMessage display="block" formik={formik} />
        <Flex>
          <Button
            backgroundColor={formik.isValid ? 'blueCta' : 'blueLight'}
            paddingY="13px"
            type="submit"
            width="100%"
          >
            <Typography color="white" variant="w700-s16">
              {enTexts.buttonNames.signIn}
            </Typography>
          </Button>
        </Flex>
        <TypographyWithButton
          alignItems="center"
          buttonText={enTexts.buttonNames.register}
          handleButtonClick={() => {
            navigate(ROUTES.signUp);
          }}
          justifyContent="center"
          marginTop="16px"
          typographyText={enTexts.claims.noAccount}
          variant="w700-s14"
        />
      </Flex>
    </FormikProvider>
  );
};

export default withFlexProps(SignInForm);
