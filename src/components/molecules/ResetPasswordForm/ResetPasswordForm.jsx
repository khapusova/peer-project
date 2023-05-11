import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import { InputForm, ErrorMessage } from '@atoms';
import { Flex, Button, Typography } from '@mixins';
import { resetPasswordSchema } from '@utils';
import { withFlexProps } from '@hocs';
import enTexts from '@translations/en.json';
import { api } from '@store/authorization/api';
import { inputProps } from './ResetPasswordForm.layoutProps';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const navigateWithModal = () => {
    navigate(ROUTES.signIn, { state: { from: 'resetPassword' } });
  };

  const formik = useFormik({
    initialValues: {
      emailInput: ''
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (data) => {
      const responce = await api.login();
      if (responce.data.map((el) => el.email).includes(data.emailInput)) {
        navigateWithModal();
      } else {
        setError();
      }
    }
  });

  const setError = () => {
    formik.errors.emailInput = enTexts.errorMessages.emailNotFound;
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
          <InputForm inputProps={inputProps(formik)} />
          <ErrorMessage display="block" formik={formik} marginY="90px" />
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
        </Flex>
      </Form>
    </FormikProvider>
  );
};

export default withFlexProps(ResetPasswordForm);
