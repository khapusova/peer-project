import React from 'react';
import { ChangePasswordForm } from '@molecules';
import { useNavigate } from 'react-router-dom';
import { ScreenWithHeader } from '@templates';
import { Typography, Flex } from '@mixins';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import enTexts from '@translations/en.json';

const ChangePassword = () => {
  const navigate = useNavigate();
  return (
    <ScreenWithHeader
      renderCenterComponent={() => (
        <Typography marginX="-20px" textAlign="center" variant="w700-s18">
          {enTexts.claims.changePassword}
        </Typography>
      )}
      renderLeftComponent={() => (
        <Flex marginX="17px" marginY="16px" onClick={() => navigate(-1)}>
          <BackButton />
        </Flex>
      )}
    >
      <ChangePasswordForm
        display="block"
        marginLeft="17px"
        marginRight="16px"
        marginTop="50px"
      />
    </ScreenWithHeader>
  );
};

export default ChangePassword;
