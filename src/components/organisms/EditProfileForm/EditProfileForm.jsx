import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Typography } from '@mixins';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { InputForm, SelectButton, ErrorMessage, Icon } from '@atoms';
import { InputsForm, AreaOfInterestInputs, BottomSwipeModal } from '@molecules';
import enTexts from '@translations/en.json';
import { withFlexProps } from '@hocs';
import { editProfileSchema } from '@utils';
import { RESEARCHFIELDS, COUNTRIES, ROUTES } from '@constants';
import { setUserData } from '@store/authorization/duck';
import { dummyInputProps } from './EditProfileForm.layoutProps';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.authorization.userInfo);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isResearchFieldModalVisible, setIsResearchFieldModalVisible] =
    useState(false);

  const [nestedField, setNestedField] = useState(null);
  const [actualAreas, setActualAreas] = useState(
    userInfo.areasOfInterest.split(',')
  );

  const [researchFieldTitle, setResearchFieldTitle] = useState(
    enTexts.claims.selectResearchField
  );

  const handleOpenCountryModal = () => {
    setIsCountryModalVisible(true);
  };

  const handleOpenResearchFieldModal = () => {
    setIsResearchFieldModalVisible(true);
  };

  const handleCountryModalCancelButtonClick = () => {
    setIsCountryModalVisible(false);
  };

  const handleResearchFieldModalCancelButtonClick = () => {
    setIsResearchFieldModalVisible(false);
  };

  const handleResearchFieldModalBackButtonClick = () => {
    setResearchFieldButton(
      <Button
        backgroundColor="none"
        left="-15px"
        onClick={handleResearchFieldModalCancelButtonClick}
        padding="0px"
        position="absolute"
        top="-3px"
      >
        <Icon height="32px" Svg={CloseButton} width="32px" />
      </Button>
    );
    setNestedField(null);
    setResearchFieldTitle(enTexts.claims.selectResearchField);
  };

  const [researchFieldButton, setResearchFieldButton] = useState(
    <Button
      backgroundColor="none"
      left="-15px"
      onClick={handleResearchFieldModalCancelButtonClick}
      padding="0px"
      position="absolute"
      top="-3px"
    >
      <Icon height="32px" Svg={CloseButton} width="32px" />
    </Button>
  );

  const formik = useFormik({
    initialValues: {
      firstName: userInfo.userName || '',
      lastName: userInfo.userSurname || '',
      country: userInfo.country || '',
      institution: userInfo.institution || '',
      researchField: userInfo.researchField || '',
      positionTitle: userInfo.position || '',
      bio: userInfo.bio || ''
    },
    validationSchema: editProfileSchema,
    onSubmit: (data) => {
      dispatch(
        setUserData({
          id: userInfo.id,
          userName: data.firstName,
          userSurname: data.lastName,
          country: data.country,
          institution: data.institution,
          areasOfInterest: actualAreas.toString(),
          researchField: data.researchField,
          position: data.positionTitle,
          bio: data.bio
        })
      );
      navigate(ROUTES.profile);
    }
  });

  return (
    <>
      <BottomSwipeModal
        data={COUNTRIES}
        handleOnSelectOption={(data) => {
          formik.values.country = data;
          delete formik.errors.country;
          setIsCountryModalVisible(false);
        }}
        renderTitleComponent={() => (
          <Flex position="relative">
            <Button
              backgroundColor="none"
              left="-15px"
              onClick={handleCountryModalCancelButtonClick}
              padding="0px"
              position="absolute"
              top="-3px"
            >
              <Icon height="32px" Svg={CloseButton} width="32px" />
            </Button>
            <Typography marginX="auto" variant="w700-s18">
              {enTexts.claims.selectCountry}
            </Typography>
          </Flex>
        )}
        visible={isCountryModalVisible}
      />
      <BottomSwipeModal
        changeContent={(field) => {
          setResearchFieldTitle(field);
          setNestedField(RESEARCHFIELDS[field]);
          setResearchFieldButton(
            <Button
              backgroundColor="none"
              left="-15px"
              onClick={handleResearchFieldModalBackButtonClick}
              padding="0px"
              position="absolute"
              top="-3px"
            >
              <Icon height="32px" Svg={BackButton} width="32px" />
            </Button>
          );
        }}
        data={nestedField}
        handleOnSelectOption={(data) => {
          formik.values.researchField = data;
          delete formik.errors.researchField;
          setIsResearchFieldModalVisible(false);
        }}
        nestedData={RESEARCHFIELDS}
        renderTitleComponent={() => (
          <Flex position="relative">
            {researchFieldButton}
            <Typography marginX="auto" variant="w700-s18">
              {researchFieldTitle}
            </Typography>
          </Flex>
        )}
        visible={isResearchFieldModalVisible}
      />
      <FormikProvider value={formik}>
        <Flex as={Form} display="block" width="100%">
          <Flex display="block">
            <InputsForm
              inputsProps={dummyInputProps(formik).slice(0, 2)}
              marginBetween="48px"
            />
            <SelectButton
              handleSelectButtonClick={handleOpenCountryModal}
              marginY="48px"
              title={
                formik.values.country.length === 0
                  ? enTexts.buttonNames.countryRegion
                  : formik.values.country
              }
              {...(Object.keys(formik.errors)[0] === 'country' && {
                invalid: true
              })}
            />
            <InputForm inputProps={dummyInputProps(formik)[2]} />
            <SelectButton
              handleSelectButtonClick={handleOpenResearchFieldModal}
              marginBottom="26px"
              marginTop="48px"
              title={
                formik.values.researchField.length === 0
                  ? enTexts.buttonNames.researchField
                  : formik.values.researchField
              }
              {...(Object.keys(formik.errors)[0] === 'researchField' && {
                invalid: true
              })}
            />
            <AreaOfInterestInputs
              display="block"
              getActualData={setActualAreas}
              initialData={userInfo.areasOfInterest.split(',')}
            />
            <InputForm
              inputProps={dummyInputProps(formik)[3]}
              marginTop="26px"
            />
            <InputForm
              inputProps={dummyInputProps(formik)[4]}
              marginTop="72px"
              withPlaceholder
            />
            <ErrorMessage formik={formik} justifyContent="center" />
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
          </Flex>
        </Flex>
      </FormikProvider>
    </>
  );
};

export default withFlexProps(EditProfileForm);
