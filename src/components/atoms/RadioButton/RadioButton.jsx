import React from 'react';
import { string } from 'prop-types';
import { Flex } from '@mixins';
import { RadioInput } from './RadioButton.styles';

const RadioButton = ({ id }) => (
  <Flex display="block" position="relative">
    <RadioInput id={id} type="radio" />
    <Flex as="label" display="block" htmlFor={id} />
    <Flex
      as="label"
      backgroundColor="white"
      borderRadius="20px"
      display="block"
      height="10px"
      htmlFor={id}
      left="5px"
      position="absolute"
      top="7px"
      width="10px"
    />
  </Flex>
);

RadioButton.propTypes = {
  id: string.isRequired
};

export default RadioButton;
