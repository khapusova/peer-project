import React, { useState } from 'react';
import { Flex, Typography } from '@mixins';
import { SocialLoginButtons, SignUpForm } from '@molecules';
import { ReactComponent as Logo } from '@svgs/logos/peerefLogo.svg';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { ScreenWithHeader } from '@templates';
import { theme } from '@styles';
import enTexts from '@translations/en.json';
import { PasswordVerification } from '../PasswordVerification';

const SignUp = () => {
  const [passwordVerificationModeData, setPasswordVerificationMode] =
    useState(null);

  if (passwordVerificationModeData !== null) {
    return <PasswordVerification generalData={passwordVerificationModeData} />;
  }

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
        marginBetween="8px"
        marginLeft="17px"
        marginRight="16px"
        marginTop="16px"
        withOrcid
      />
      <Flex
        marginLeft="17px"
        marginRight="16px"
        marginY="45px"
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
      <SignUpForm
        display="block"
        marginLeft="17px"
        marginRight="16px"
        setPasswordVerificationMode={setPasswordVerificationMode}
      />
    </ScreenWithHeader>
  );
};

export default SignUp;
