import React, { useState, useEffect } from 'react';
import { ScreenWithHeader } from '@templates';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromLS } from '@store/localStorage';
import { getActualUserInfo } from '@store/authorization/duck';
import { PersonalInfoForm } from '@organisms';
import { LOCALSTORAGE } from '@constants';
import { Typography, Button } from '@mixins';
import { useModal } from '@hooks';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { ReactComponent as ApproveButton } from '@svgs/buttons/checkmark.svg';
import enTexts from '@translations/en.json';
import { Loading } from '../Loading';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPending = useSelector((state) => state.authorization.isPending);
  const { showModal, hideModal } = useModal();

  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [editPhoneMode, setEditPhoneMode] = useState(false);
  useEffect(() => {
    const onLoad = async () => {
      const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
      const id = parseInt(token[token.length - 1], 10);
      await dispatch(getActualUserInfo({ token, id }));
    };

    onLoad();
  }, []);
  const handleCloseButtonClick = () => {
    showModal({
      approveButtonText: enTexts.buttonNames.discardChanges,
      contentText: enTexts.claims.changesWillBeDiscarded,
      onApprove: () => {
        navigate(-1);
      },
      onCancel: handleModalCancelButtonClick
    });
  };

  const handleApproveButtonClick = () => {
    setEditPhoneMode(false);
  };

  const handleModalCancelButtonClick = () => {
    hideModal();
  };

  return (
    <>
      <Loading isLoadingVisible={isPending} />

      <ScreenWithHeader
        renderCenterComponent={() => (
          <Typography marginX="-35px" variant="w700-s18">
            {enTexts.claims.personalInformation}
          </Typography>
        )}
        renderLeftComponent={() => (
          <Button
            backgroundColor="none"
            display="flex"
            marginX="17px"
            marginY="16px"
            onClick={handleCloseButtonClick}
            padding="0px"
          >
            <CloseButton />
          </Button>
        )}
        {...(editPhoneMode && {
          renderRightComponent: () => (
            <Button
              backgroundColor="none"
              disabled={!phoneIsValid}
              display="flex"
              marginX="17px"
              marginY="16px"
              onClick={handleApproveButtonClick}
              padding="0px"
            >
              <ApproveButton />
            </Button>
          )
        })}
      >
        <PersonalInfoForm
          editPhoneMode={editPhoneMode}
          marginLeft="17px"
          marginRight="16px"
          marginTop="64px"
          setEditPhoneMode={setEditPhoneMode}
          setPhoneIsValid={setPhoneIsValid}
        />
      </ScreenWithHeader>
    </>
  );
};

export default PersonalInfo;
