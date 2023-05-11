import React from 'react';
import { Flex } from '@mixins';
import { useNavigate } from 'react-router-dom';
import { PasswordVerificationForm } from '@molecules';
import { ReactComponent as Logo } from '@svgs/logos/peerefLogo.svg';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { ScreenWithHeader } from '@templates';
import { shape, string } from 'prop-types';
import { ROUTES } from '@constants';

const PasswordVerification = ({ generalData }) => {
  const navigate = useNavigate();

  return (
    <ScreenWithHeader
      renderCenterComponent={() => <Logo color="orange" />}
      renderLeftComponent={() => (
        <Flex marginX="17px" marginY="16px">
          <CloseButton
            onClick={() => {
              navigate(ROUTES.signIn);
            }}
          />
        </Flex>
      )}
    >
      <PasswordVerificationForm
        display="block"
        generalData={generalData}
        marginLeft="17px"
        marginRight="16px"
        marginTop="40px"
      />
    </ScreenWithHeader>
  );
};

PasswordVerification.propTypes = {
  generalData: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    emailInstitution: string.isRequired
  }).isRequired
};

export default PasswordVerification;
