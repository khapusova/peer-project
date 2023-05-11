import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LOCALSTORAGE, ROUTES } from '@constants';
import { ErrorMessage } from '@atoms';
import { Flex, Button, Typography } from '@mixins';
import { changeEmailSchema } from '@utils';
import { withFlexProps } from '@hocs';
import { getDataFromLS } from '@store/localStorage';
import enTexts from '@translations/en.json';
import { api } from '@store/authorization/api';
import { changeEmail } from '@store/authorization/duck';
import { useDispatch } from 'react-redux';
import { InputsForm } from '../InputsForm';
import { inputsProps } from './ChangeEmailForm.layoutProps';

const ChangeEmailForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateWithModal = () => {
    navigate(ROUTES.profile, { state: { from: 'changeEmail' } });
  };

  const formik = useFormik({
    initialValues: {
      oldEmail: '',
      newEmail: '',
      password: ''
    },
    validationSchema: changeEmailSchema,
    onSubmit: async (data) => {
      if (data.oldEmail === data.newEmail) {
        setError('same');
      } else {
        const responce = await api.login();
        const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
        const [user] = responce.data.filter((el) => el.token === token);
        if (user.email === data.oldEmail && user.password === data.password) {
          dispatch(changeEmail({ email: data.newEmail, token }));
          navigateWithModal();
        } else {
          setError('incorrect_data');
        }
      }
    }
  });

  const setError = (reason) => {
    if (reason === 'same') {
      formik.errors.newEmail = enTexts.errorMessages.emailsMustBeDifferent;
    }
    formik.errors.oldEmail = enTexts.errorMessages.dataIsIncorrect;
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
          <InputsForm inputsProps={inputsProps(formik)} marginBetween="40px" />
          <ErrorMessage display="block" formik={formik} width="100%" />
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

export default withFlexProps(ChangeEmailForm);
