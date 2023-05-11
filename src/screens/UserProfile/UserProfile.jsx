import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '@store/authorization/api';
import { Avatar, DropdownMenu } from '@atoms';
import { UserProfileTabs, About } from '@molecules';
import { ScreenWithHeader } from '@templates';
import { Flex, Button, Typography } from '@mixins';
import { LOCALSTORAGE, ROUTES } from '@constants';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import enTexts from '@translations/en.json';
import { theme } from '@styles';
import { getDataFromLS } from '@store/localStorage';
import { getActualUserInfo } from '@store/authorization/duck';
import { Loading } from '../Loading';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const isPending = useSelector((state) => state.authorization.isPending);
  const [userInfo, setUserInfo] = useState(
    useSelector((state) => state.authorization.userInfo)
  );

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleEditProfileButtonClick = () => navigate(ROUTES.editProfile);

  const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
  const id = parseInt(token[token.length - 1], 10);
  const isUserProfile = parseInt(params.id, 10) === id;

  useEffect(() => {
    const onLoad = async () => {
      const result = await api.getUserById({ id: parseInt(params.id, 10) });
      setUserInfo(result);
      await dispatch(getActualUserInfo({ token, id }));
    };

    onLoad();
  }, []);

  return (
    <>
      <Loading isLoadingVisible={isPending} />
      <ScreenWithHeader
        renderLeftComponent={() => (
          <Flex marginX="17px" marginY="16px" onClick={handleBackButtonClick}>
            <BackButton />
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
        {isUserProfile && (
          <Flex marginLeft="17px" marginRight="16px">
            <Button
              backgroundColor="none"
              border={`1px solid ${theme.colors.grey}`}
              onClick={handleEditProfileButtonClick}
              width="100%"
            >
              <Typography
                paddingBottom="9.5px"
                paddingTop="8.5px"
                variant="w700-s16"
              >
                {enTexts.claims.editProfile}
              </Typography>
            </Button>
          </Flex>
        )}
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
          {isUserProfile && (
            <Button backgroundColor="none">
              <Typography variant="w400-s12">
                {enTexts.claims.recentViews}
              </Typography>
            </Button>
          )}
        </Flex>
        <About
          display="block"
          fullUserInfo={userInfo}
          marginLeft="17px"
          marginRight="16px"
        />
        <DropdownMenu
          marginLeft="17px"
          marginRight="16px"
          title={enTexts.buttonNames.social}
        />
        <UserProfileTabs display="block" marginLeft="17px" marginRight="16px" />
      </ScreenWithHeader>
    </>
  );
};

export default UserProfile;
