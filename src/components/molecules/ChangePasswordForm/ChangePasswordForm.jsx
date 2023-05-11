import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LOCALSTORAGE, ROUTES } from '@constants';
import { InputForm, ErrorMessage } from '@atoms';
import { Flex, Button, Typography } from '@mixins';
import { changePasswordSchema } from '@utils';
import { withFlexProps } from '@hocs';
import { getDataFromLS } from '@store/localStorage';
import enTexts from '@translations/en.json';
import { api } from '@store/authorization/api';
import { changePassword } from '@store/authorization/duck';
import { useDispatch } from 'react-redux';
import { InputsForm } from '../InputsForm';
import { inputsProps } from './ChangePassword.layoutProps';

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateWithModal = () => {
    navigate(ROUTES.profile, { state: { from: 'changePassword' } });
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (data) => {
      const responce = await api.login();
      const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
      const [user] = responce.data.filter((el) => el.token === token);
      if (user.password === data.oldPassword) {
        dispatch(changePassword({ password: data.newPassword, token }));
        navigateWithModal();
      } else {
        setError();
      }
    }
  });

  const setError = () => {
    formik.errors.oldPassword = enTexts.errorMessages.passwordIsIncorrect;
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          margin="auto"
          width="100%"
        >
          <Flex display="block" position="relative">
            <InputForm inputProps={inputsProps(formik)[0]} />
            <Button
              backgroundColor="none"
              bottom="-28px"
              color="blueCta"
              position="absolute"
              right="0px"
              type="button"
            >
              <Typography variant="w700-s14">
                {enTexts.buttonNames.forgotPassword}
              </Typography>
            </Button>
          </Flex>
          <Flex marginY="47px">
            {`${Object.keys(formik.errors)[0]}` === 'oldPassword' && (
              <ErrorMessage
                display="block"
                formik={formik}
                width="100%"
                withoutPadding
              />
            )}
          </Flex>
          <InputsForm
            inputsProps={inputsProps(formik).slice(1, 3)}
            marginBetween="40px"
          />
          <Flex marginY="25px">
            {`${Object.keys(formik.errors)[0]}` !== 'oldPassword' && (
              <ErrorMessage
                display="block"
                formik={formik}
                width="100%"
                withoutPadding
              />
            )}
          </Flex>
          <Flex marginTop="300px">
            <Button
              backgroundColor={formik.isValid ? 'blueCta' : 'blueLight'}
              paddingY="13px"
              type="submit"
              width="100%"
            >
              <Typography color="white" variant="w700-s16">
                {enTexts.buttonNames.submit}
              </Typography>
            </Button>
          </Flex>
        </Flex>
      </Form>
    </FormikProvider>
  );
};

export default withFlexProps(ChangePasswordForm);
