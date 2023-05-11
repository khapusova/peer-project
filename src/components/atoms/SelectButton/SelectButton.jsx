import { bool, func, string } from 'prop-types';
import React from 'react';
import { Icon } from '@atoms';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import { Flex, Button, Typography } from '@mixins';
import { theme } from '@styles';
import { withFlexProps } from '@hocs';
import { BackButtonWrapper } from './SelectButton.styles';

const SelectButton = ({ title, handleSelectButtonClick, invalid }) => (
  <Button
    backgroundColor="none"
    onClick={handleSelectButtonClick}
    type="button"
    width="100%"
  >
    <Flex alignItems="center" justifyContent="space-between">
      <Typography color={invalid ? 'red' : 'greyIconsText'} variant="w400-s14">
        {title}
      </Typography>
      <BackButtonWrapper>
        <Icon
          color={invalid ? theme.colors.red : theme.colors.greyIconsText}
          height="24px"
          Svg={BackButton}
          width="24px"
        />
      </BackButtonWrapper>
    </Flex>
  </Button>
);

SelectButton.defaultProps = {
  invalid: false
};

SelectButton.propTypes = {
  title: string.isRequired,
  handleSelectButtonClick: func.isRequired,
  invalid: bool
};

export default withFlexProps(SelectButton);
