import { Flex, Typography } from '@mixins';
import { ReactComponent as OnboardingIcon } from '@svgs/icons/onboarding.svg';
import React from 'react';
import enTexts from '@translations/en.json';

const Welcome = () => (
  <>
    <Flex justifyContent="center" marginBottom="48px" marginTop="128px">
      <OnboardingIcon />
    </Flex>
    <Typography marginBottom="24px" textAlign="center" variant="w700-s24">
      {enTexts.claims.welcome}
    </Typography>
    <Flex flexDirection="column" marginX="46px">
      <Typography
        color="greyText"
        marginBottom="20px"
        textAlign="center"
        variant="w400-s16"
      >
        {enTexts.claims.browseConnectExplore}
      </Typography>
      <Typography color="greyText" textAlign="center" variant="w400-s16">
        {enTexts.claims.letsGetStarted}
      </Typography>
    </Flex>
  </>
);

export default Welcome;
