import React, { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Typography } from '@mixins';
import { ErrorMessage, InputForm } from '@atoms';
import { InputsForm, PhoneInput } from '@molecules';
import { setUserSettings } from '@store/authorization/duck';
import enTexts from '@translations/en.json';
import { withFlexProps } from '@hocs';
import { personalInfoSchema } from '@utils';
import { bool, func } from 'prop-types';
import { dummyInputProps } from './PersonalInfoForm.layoutProps';

const PersonalInfoForm = ({
  editPhoneMode,
  setEditPhoneMode,
  setPhoneIsValid
}) => {
  const dispatch = useDispatch();
  const [phoneCode, setPhoneCode] = useState('');
  const temporaryUserId = useSelector(
    (state) => state.authorization.userInfo.id
  );

  const formik = useFormik({
    initialValues: {
      phone: '',
      website: '',
      linkedIn: '',
      orcid: ''
    },
    validationSchema: personalInfoSchema,
    onSubmit: (data) => {
      const transformedData = {
        ...data,
        phone: `${phoneCode}${data.phone.replace(/\D/g, '')}`
      };
      dispatch(
        setUserSettings({ id: temporaryUserId, settings: transformedData })
      );
    }
  });

  useEffect(() => {
    if (formik.errors.phone || formik.values.phone.length === 0) {
      setPhoneIsValid(false);
    } else {
      setPhoneIsValid(true);
    }
  }, [formik.errors, formik.values.phone]);

  return (
    <FormikProvider value={formik}>
      <Flex as={Form} display="block" width="100%">
        <Flex display="block">
          <Flex display="block" position="relative">
            {editPhoneMode ? (
              <PhoneInput
                editPhoneMode={editPhoneMode}
                existingValue={formik.values.phone}
                getTemporaryValue={(target) => {
                  formik.values.phone = target;
                }}
                marginBottom="36px"
                phoneCode={phoneCode}
                phoneInputProps={dummyInputProps(formik, editPhoneMode)[0]}
                setEditPhoneMode={setEditPhoneMode}
                setPhoneCode={(data) => setPhoneCode(data)}
                setPhoneIsValid={setPhoneIsValid}
              />
            ) : (
              <InputForm
                disabled
                inputProps={{
                  ...dummyInputProps(formik, editPhoneMode)[0],
                  value: `${phoneCode}${formik.values?.phone}`
                }}
                marginBottom="36px"
                onClick={() => setEditPhoneMode(true)}
              />
            )}
            <InputsForm
              inputsProps={dummyInputProps(formik, editPhoneMode).slice(1, 4)}
              marginBetween="48px"
              withPlaceholder
            />
            <Button
              backgroundColor="none"
              bottom="-30px"
              color="blueCta"
              display="flex"
              position="absolute"
              right="0px"
              type="button"
            >
              <Typography variant="w700-s14">
                {enTexts.claims.howToApplyOrcidNumber}
              </Typography>
            </Button>
          </Flex>
          <ErrorMessage
            formik={formik}
            justifyContent="center"
            marginY="100px"
          />
          {!editPhoneMode && (
            <Flex>
              <Button
                backgroundColor={formik.isValid ? 'blueCta' : 'blueLight'}
                marginBottom="40px"
                paddingY="13px"
                type="submit"
                width="100%"
              >
                <Typography color="white" variant="w700-s16">
                  {enTexts.buttonNames.save}
                </Typography>
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </FormikProvider>
  );
};

PersonalInfoForm.propTypes = {
  editPhoneMode: bool.isRequired,
  setEditPhoneMode: func.isRequired,
  setPhoneIsValid: func.isRequired
};

export default withFlexProps(PersonalInfoForm);
