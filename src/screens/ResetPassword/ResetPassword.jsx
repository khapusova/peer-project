import React from 'react';
import { ResetPasswordForm } from '@molecules';
import { ScreenWithHeader } from '@templates';
import { Typography, Flex } from '@mixins';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import enTexts from '@translations/en.json';

const ResetPassword = () => (
  <ScreenWithHeader
    renderCenterComponent={() => (
      <Typography marginX="-20px" textAlign="center" variant="w700-s18">
        {enTexts.claims.resetPassword}
      </Typography>
    )}
    renderLeftComponent={() => (
      <Flex marginX="17px" marginY="16px">
        <BackButton />
      </Flex>
    )}
  >
    <Flex marginX="40px" marginY="96px">
      <Typography color="greyText" textAlign="center" variant="w400-s16">
        {enTexts.claims.instructionsOnEmail}
      </Typography>
    </Flex>
    <ResetPasswordForm display="block" marginLeft="17px" marginRight="16px" />
  </ScreenWithHeader>
);

export default ResetPassword;
