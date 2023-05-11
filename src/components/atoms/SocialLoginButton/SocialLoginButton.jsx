import React from 'react';
import { Flex, Typography, Button } from '@mixins';
import { oneOf, shape, string } from 'prop-types';
import { withFlexProps } from '@hocs';
import { logo } from './SocialLoginButton.layoutProps';

const SocialLoginButton = ({ buttonProps }) => (
  <Button
    backgroundColor="white"
    border="1px solid"
    borderColor="grey"
    borderRadius="6px"
    paddingBottom="12px"
    paddingTop="14px"
    width="100%"
  >
    <Flex>
      <Typography margin="auto" marginRight="10px">
        {logo(buttonProps.name)}
      </Typography>
      <Typography margin="auto" marginLeft="0px" variant="w500-s17">
        {buttonProps.text}
      </Typography>
    </Flex>
  </Button>
);

SocialLoginButton.propTypes = {
  buttonProps: shape({
    name: oneOf(['googleLogin', 'facebookLogin', 'appleIDLogin', 'orcidLogin'])
      .isRequired,
    text: string.isRequired,
    id: string.isRequired
  }).isRequired
};

export default withFlexProps(SocialLoginButton);
