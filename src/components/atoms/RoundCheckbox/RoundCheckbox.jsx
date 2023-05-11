import React from 'react';
import { bool, func, string } from 'prop-types';
import { Flex } from '@mixins';
import { CheckboxInput } from './RoundCheckbox.styles';

const RoundCheckbox = ({ id, checked, handleOnChange }) => (
  <>
    <CheckboxInput
      id={id}
      onChange={handleOnChange}
      type="checkbox"
      value={checked}
    />
    <Flex as="label" display="block" htmlFor={id} />
  </>
);

RoundCheckbox.propTypes = {
  id: string.isRequired,
  checked: bool.isRequired,
  handleOnChange: func.isRequired
};

export default RoundCheckbox;
