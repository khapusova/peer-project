import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flex, Typography } from '@mixins';
import { ScreenWithHeader } from '@templates';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import enTexts from '@translations/en.json';
import { useModal } from '@hooks';
import { ROUTES, LOCALSTORAGE } from '@constants';
import { authorizationActions } from '@store/authorization';
import { exploringActions } from '@store/exploring';
import { trendingActions } from '@store/trending';
import { journalPageActions } from '@store/journalPage';
import { clearLS, getDataFromLS, setDataToLS } from '@store/localStorage';
import { buttonsProps } from './AccountSettings.layoutProps';

const AccountSettings = () => {
  const navigate = useNavigate();

  const editProfile = () => {
    navigate(ROUTES.editProfile);
  };

  const dispatch = useDispatch();
  const { showModal, hideModal } = useModal();

  const logout = () => {
    clearLS();

    dispatch(authorizationActions.resetState());
    dispatch(exploringActions.resetState());
    dispatch(trendingActions.resetState());
    dispatch(journalPageActions.resetState());

    navigate(ROUTES.signIn);
    hideModal();
  };

  const changePassword = () => {
    navigate(ROUTES.changePassword);
  };

  const changeEmail = () => {
    navigate(ROUTES.changeEmail);
  };

  const clearCache = () => {
    const token = getDataFromLS(LOCALSTORAGE.activeUser);
    clearLS();
    setDataToLS(LOCALSTORAGE.activeUser, token);

    dispatch(authorizationActions.resetState());
    dispatch(exploringActions.resetState());
    dispatch(trendingActions.resetState());
    dispatch(journalPageActions.resetState());

    showModal({
      approveButtonText: enTexts.buttonNames.ok,
      onApprove: hideModal,
      renderTitleComponent: () => (
        <Typography marginBottom="10px" textAlign="center" variant="w700-s18">
          {enTexts.claims.cacheCleared}
        </Typography>
      )
    });
  };

  const handleOpenModal = () => {
    showModal({
      approveButtonText: enTexts.buttonNames.ok,
      contentText: enTexts.claims.logOutConfirmation,
      onApprove: logout,
      onCancel: hideModal,
      renderTitleComponent: () => (
        <Typography marginBottom="10px" textAlign="center" variant="w700-s18">
          {enTexts.claims.logOut}
        </Typography>
      )
    });
  };

  const memoList = useMemo(() =>
    buttonsProps(
      editProfile,
      clearCache,
      handleOpenModal,
      changePassword,
      changeEmail
    ).map((el) => (
      <Flex
        key={el.id}
        borderBottom="1px solid"
        borderBottomColor="greyLine"
        onClick={el.handleOnClick}
        paddingY="24px"
      >
        <Typography variant="w400-s16">{el.title}</Typography>
      </Flex>
    ))
  );

  return (
    <ScreenWithHeader
      renderCenterComponent={() => (
        <Typography marginX="-20px" textAlign="center" variant="w700-s18">
          {enTexts.claims.settings}
        </Typography>
      )}
      renderLeftComponent={() => (
        <Flex
          marginX="17px"
          marginY="16px"
          onClick={() => {
            navigate(-1);
          }}
        >
          <CloseButton />
        </Flex>
      )}
    >
      <Flex flexDirection="column" marginLeft="17px" marginRight="16px">
        {memoList.map((el) => el)}
      </Flex>
    </ScreenWithHeader>
  );
};

export default AccountSettings;
