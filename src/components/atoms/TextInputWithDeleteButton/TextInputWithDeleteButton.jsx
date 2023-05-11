import React from 'react';
import { Input, Button, Flex } from '@mixins';
import { theme } from '@styles';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { Icon } from '@atoms';
import { withFlexProps } from '@hocs';
import { func, string } from 'prop-types';

const TextInputWithDeleteButton = ({
  handleDeleteButtonPress,
  handleOnChange,
  value
}) => (
  <Flex justifyContent="space-between" position="relative" width="100%">
    <Input
      height="32px"
      onChange={handleOnChange}
      type="text"
      use="assignment"
      value={value}
      variant="w400-s16"
      width="100%"
    />
    <Button
      backgroundColor="none"
      bottom="8px"
      onClick={handleDeleteButtonPress}
      position="absolute"
      right="0px"
    >
      <Icon
        color={theme.colors.greyDark}
        height="24px"
        Svg={CloseButton}
        width="24px"
      />
    </Button>
  </Flex>
);

TextInputWithDeleteButton.propTypes = {
  value: string.isRequired,
  handleDeleteButtonPress: func.isRequired,
  handleOnChange: func.isRequired
};

export default withFlexProps(TextInputWithDeleteButton);
