import React, { useMemo, useEffect } from 'react';
import { ScreenWithHeader } from '@templates';
import { Avatar, Icon, NavigationButton } from '@atoms';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AccountYouMayFollow } from '@molecules';
import { Flex, Button, Typography } from '@mixins';
import { theme } from '@styles';
import { LOCALSTORAGE, ROUTES } from '@constants';
import { useModal } from '@hooks';
import { getActualUserInfo } from '@store/authorization/duck';
import { getDataFromLS } from '@store/localStorage';
import { ReactComponent as Mail } from '@svgs/icons/email.svg';
import { ReactComponent as Menu } from '@svgs/icons/menu.svg';
import enTexts from '@translations/en.json';
import { navigationButtonsProps } from './Account.layoutProps';
import { Loading } from '../Loading';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showModal, hideModal } = useModal();
  const isPending = useSelector((state) => state.authorization.isPending);

  const location = useLocation();

  const handleResetPasswordModalCancelButtonClick = () => {
    hideModal();
    window.history.replaceState({}, document.title);
  };

  useEffect(() => {
    const onLoad = async () => {
      const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
      const id = parseInt(token[token.length - 1], 10);
      await dispatch(getActualUserInfo({ token, id }));
    };

    onLoad();

    if (location.state?.from === 'passwordVerification') {
      showModal({
        approveButtonText: enTexts.buttonNames.ok,
        contentText: enTexts.claims.checkLink,
        onApprove: handleResetPasswordModalCancelButtonClick,
        renderTitleComponent: () => (
          <Typography textAlign="center" variant="w700-s17">
            {enTexts.claims.registrationSuccessful}
          </Typography>
        )
      });
    }
    if (
      location.state?.from === 'changePassword' ||
      location.state?.from === 'changeEmail'
    ) {
      showModal({
        approveButtonText: enTexts.buttonNames.ok,
        onApprove: handleResetPasswordModalCancelButtonClick,
        renderTitleComponent: () => (
          <Typography textAlign="center" variant="w700-s17">
            {location.state.from === 'changePassword'
              ? enTexts.claims.passwordChangedSuccessfully
              : enTexts.claims.emailChangedSuccessfully}
          </Typography>
        )
      });
    }
  }, []);

  const userInfo = useSelector((state) => state.authorization.userInfo);

  const handleViewProfileButtonClick = () => {
    navigate(`${ROUTES.authors}/${userInfo.id}`);
  };

  const memoButtonsFirstRow = useMemo(
    () => (
      <Flex>
        {navigationButtonsProps.slice(0, 3).map((el) => (
          <NavigationButton
            key={el.id}
            IconComponent={<el.component />}
            marginBottom="37px"
            marginX="auto"
            route={el.route}
            title={el.title}
          />
        ))}
      </Flex>
    ),
    [navigationButtonsProps]
  );

  const memoButtonsSecondRow = useMemo(
    () => (
      <Flex>
        {navigationButtonsProps.slice(3, 6).map((el) => (
          <NavigationButton
            key={el.id}
            IconComponent={<el.component />}
            marginX="auto"
            route={el.route}
            title={el.title}
          />
        ))}
      </Flex>
    ),
    [navigationButtonsProps]
  );

  return (
    <>
      <Loading isLoadingVisible={isPending} />
      <ScreenWithHeader
        renderRightComponent={() => (
          <Flex margin="16px">
            <Icon
              height="24px"
              marginRight="24px"
              onClick={() => {
                navigate(ROUTES.settings);
              }}
              Svg={Menu}
              width="24px"
            />
            <Icon height="24px" Svg={Mail} width="24px" />
          </Flex>
        )}
      >
        <Avatar
          country={userInfo.country}
          display="inline-flex"
          institution={userInfo.institution}
          marginBottom="18px"
          marginLeft="17px"
          marginRight="16px"
          marginTop="16px"
          userName={userInfo.userName}
          userSurname={userInfo.userSurname}
        />

        <Flex marginLeft="17px" marginRight="16px">
          <Button
            backgroundColor="none"
            border={`1px solid ${theme.colors.grey}`}
            onClick={handleViewProfileButtonClick}
            width="100%"
          >
            <Typography
              paddingBottom="9.5px"
              paddingTop="8.5px"
              variant="w700-s16"
            >
              {enTexts.buttonNames.viewProfile}
            </Typography>
          </Button>
        </Flex>
        <Flex
          borderY={`1px solid ${theme.colors.greyLine}`}
          justifyContent="space-between"
          marginLeft="17px"
          marginRight="16px"
          marginY="16px"
          paddingY="16px"
        >
          <Button backgroundColor="none" display="flex">
            <Typography marginRight="5px" variant="w700-s12">
              {userInfo.following?.length || 0}
            </Typography>
            <Typography variant="w400-s12">
              {enTexts.claims.following}
            </Typography>
          </Button>

          <Button backgroundColor="none" display="flex">
            <Typography marginRight="5px" variant="w700-s12">
              {userInfo.followers}
            </Typography>
            <Typography variant="w400-s12">
              {enTexts.claims.followers}
            </Typography>
          </Button>
          <Button backgroundColor="none">
            <Typography variant="w400-s12">
              {enTexts.claims.recentViews}
            </Typography>
          </Button>
        </Flex>
        <Flex
          flexDirection="column"
          marginBottom="15px"
          marginLeft="17px"
          marginRight="16px"
        >
          {memoButtonsFirstRow}
          {memoButtonsSecondRow}
        </Flex>
        <Flex
          borderTop="1px solid"
          borderTopColor="greyLine"
          marginLeft="17px"
          marginRight="16px"
          paddingBottom="24px"
          paddingTop="16px"
        >
          <Typography variant="w700-s18">
            {enTexts.claims.peopleYouMayFollow}
          </Typography>
        </Flex>
        <AccountYouMayFollow
          institution="University of Liverpool"
          isFollowed
          marginLeft="17px"
          marginRight="16px"
          userName="Pol"
          userSurname="Nadal"
        />
      </ScreenWithHeader>
    </>
  );
};

export default Account;
