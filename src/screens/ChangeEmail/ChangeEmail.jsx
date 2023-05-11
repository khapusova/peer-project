import React from 'react';
import { ChangeEmailForm } from '@molecules';
import { useNavigate } from 'react-router-dom';
import { ScreenWithHeader } from '@templates';
import { Typography, Flex } from '@mixins';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import enTexts from '@translations/en.json';

const ChangeEmail = () => {
  const navigate = useNavigate();

  return (
    <ScreenWithHeader
      renderCenterComponent={() => (
        <Typography marginX="-20px" textAlign="center" variant="w700-s18">
          {enTexts.claims.changeEmail}
        </Typography>
      )}
      renderLeftComponent={() => (
        <Flex marginX="17px" marginY="16px" onClick={() => navigate(-1)}>
          <BackButton />
        </Flex>
      )}
    >
      <ChangeEmailForm
        display="block"
        marginLeft="17px"
        marginRight="16px"
        marginTop="50px"
      />
    </ScreenWithHeader>
  );
};

export default ChangeEmail;
