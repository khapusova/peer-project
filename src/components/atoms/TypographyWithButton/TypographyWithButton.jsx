import React from 'react';
import { withFlexProps } from '@hocs';
import { Typography, Button } from '@mixins';
import { func, oneOf, string } from 'prop-types';

const TypographyWithButton = ({
  typographyText,
  buttonText,
  handleButtonClick,
  variant
}) => (
  <Typography color="greyIconsText" textAlign="center" variant={variant}>
    {typographyText}
    <Button
      backgroundColor="none"
      color="blueCta"
      onClick={handleButtonClick}
      type="button"
    >
      <Typography variant={variant}>{buttonText}</Typography>
    </Button>
  </Typography>
);

TypographyWithButton.propTypes = {
  typographyText: string.isRequired,
  buttonText: string.isRequired,
  handleButtonClick: func.isRequired,
  variant: oneOf([
    'w500-s10',
    'w400-s12',
    'w700-s12',
    'w400-s14',
    'w700-s14',
    'w700-s16',
    'w400-s16',
    'w500-s17',
    'w700-s18',
    'w700-s24'
  ]).isRequired
};

export default withFlexProps(TypographyWithButton);
