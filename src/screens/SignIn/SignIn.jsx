import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Typography } from '@mixins';
import { Icon } from '@atoms';
import { useModal } from '@hooks';
import { SocialLoginButtons, SignInForm } from '@molecules';
import { ReactComponent as Logo } from '@svgs/logos/peerefLogo.svg';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { ReactComponent as Orcid } from '@svgs/logos/orcid.svg';
import { ReactComponent as Mail } from '@svgs/icons/email.svg';
import { ScreenWithHeader } from '@templates';
import { theme } from '@styles';
import enTexts from '@translations/en.json';

const SignIn = () => {
  const location = useLocation();
  const { showModal, hideModal } = useModal();

  useEffect(() => {
    if (location.state?.from === 'resetPassword') {
      showModal({
        approveButtonText: enTexts.buttonNames.ok,
        contentText: enTexts.claims.checkLink,
        onApprove: handleResetPasswordModalCancelButtonClick,
        renderTitleComponent: () => (
          <Flex width="100%">
            <Icon
              color={theme.colors.blueCta}
              height="65px"
              marginX="auto"
              Svg={Mail}
              width="65px"
            />
          </Flex>
        )
      });
    }
  }, []);

  const handleResetPasswordModalCancelButtonClick = () => {
    hideModal();
    window.history.replaceState({}, document.title);
  };

  return (
    <ScreenWithHeader
      renderCenterComponent={() => <Logo color="orange" />}
      renderLeftComponent={() => (
        <Flex marginX="17px" marginY="16px">
          <CloseButton />
        </Flex>
      )}
    >
      <SocialLoginButtons
        marginBetween="12px"
        marginLeft="17px"
        marginRight="16px"
        marginTop="16px"
      />
      <Flex
        marginBottom="56px"
        marginLeft="17px"
        marginRight="16px"
        marginTop="53px"
        position="relative"
      >
        <Flex borderTop={`1px solid ${theme.colors.greyLine}`} width="100%" />
        <Flex
          justifyContent="center"
          position="absolute"
          top="-23px"
          width="100%"
        >
          <Typography
            backgroundColor="white"
            color="greyLineText"
            padding="12px"
            variant="w400-s16"
          >
            {enTexts.claims.or}
          </Typography>
        </Flex>
      </Flex>
      <SignInForm marginLeft="17px" marginRight="16px" marginTop="40px" />
      <Flex justifyContent="center" marginTop="25px">
        <Orcid />
        <Typography
          borderBottom={`1px solid ${theme.colors.greyIconsText}`}
          color="greyIconsText"
          marginLeft="8px"
          variant="w400-s14"
        >
          {enTexts.buttonNames.instructionsOrcid}
        </Typography>
      </Flex>
    </ScreenWithHeader>
  );
};

export default SignIn;
