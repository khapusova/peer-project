import React, { useMemo } from 'react';
import { SocialLoginButton } from '@atoms';
import { Flex } from '@mixins';
import { bool, string } from 'prop-types';
import { withFlexProps } from '@hocs';
import { socialLoginButtonsProps } from './SocialLoginButtons.layoutProps';

const SocialLoginButtons = ({ withOrcid, marginBetween }) => {
  const actualProps = withOrcid
    ? socialLoginButtonsProps
    : socialLoginButtonsProps.slice(0, -1);
  const memoButtons = useMemo(
    () =>
      actualProps.map((buttonProps, index) => (
        <SocialLoginButton
          {...(actualProps.length !== index + 1 && {
            marginBottom: marginBetween
          })}
          key={buttonProps.id}
          buttonProps={buttonProps}
        />
      )),
    [socialLoginButtonsProps, withOrcid]
  );

  return (
    <Flex flexDirection="column" width="100%">
      {memoButtons.map((inp) => inp)}
    </Flex>
  );
};

SocialLoginButtons.defaultProps = {
  withOrcid: false
};

SocialLoginButtons.propTypes = {
  withOrcid: bool,
  marginBetween: string.isRequired
};

export default withFlexProps(SocialLoginButtons);
