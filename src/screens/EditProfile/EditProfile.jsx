import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenWithHeader } from '@templates';
import { Icon } from '@atoms';
import { EditProfileForm } from '@organisms';
import { Flex, Typography, Button } from '@mixins';
import { useModal } from '@hooks';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { ReactComponent as DefaultAvatar } from '@svgs/icons/defaultAvatar.svg';
import { LOCALSTORAGE } from '@constants';
import enTexts from '@translations/en.json';
import { useDispatch, useSelector } from 'react-redux';
import { getActualUserInfo } from '@store/authorization/duck';
import { getDataFromLS } from '@store/localStorage';
import { Loading } from '../Loading';

const EditProfile = () => {
  const isPending = useSelector((state) => state.authorization.isPending);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showModal, hideModal } = useModal();

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
      onApprove: hangleModalApproveButtonClick,
      onCancel: handleModalCancelButtonClick
    });
  };

  const handleModalCancelButtonClick = () => {
    hideModal();
  };

  const hangleModalApproveButtonClick = () => {
    hideModal();
    navigate(-1);
  };

  return (
    <>
      <Loading isLoadingVisible={isPending} />

      <ScreenWithHeader
        renderCenterComponent={() => (
          <Typography variant="w700-s18">
            {enTexts.claims.editProfile}
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
      >
        <Flex flexDirection="column" marginBottom="48px">
          <Icon
            height="112px"
            marginBottom="16px"
            marginTop="29px"
            marginX="auto"
            Svg={DefaultAvatar}
            width="112px"
          />
          <Typography color="blueCta" marginX="auto" variant="w700-s16">
            {enTexts.buttonNames.addProfilePhoto}
          </Typography>
        </Flex>
        <EditProfileForm marginLeft="17px" marginRight="16px" />
      </ScreenWithHeader>
    </>
  );
};

export default EditProfile;
