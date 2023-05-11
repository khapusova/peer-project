import React, { useState, useEffect } from 'react';
import { string, shape, func, bool } from 'prop-types';
import { Flex } from '@mixins';
import { withFlexProps } from '@hocs';
import { Label, InputMultiline } from './InputForm.styles';

const InputForm = ({ inputProps, withPlaceholder, disabled }) => {
  const [focused, setFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!disabled) {
      if (inputProps.value.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [inputProps.value]);

  const handleOnFocus = () => {
    setFocused(true);
  };

  const handleOnBlur = () => {
    setFocused(false);
  };

  const handleOnChange = (e) => {
    if (e.target.value.length === 0) setIsEmpty(true);
    else setIsEmpty(false);
  };

  return (
    <Flex flexDirection="column" position="relative" width="100%">
      <Label
        focused={focused}
        invalid={inputProps.invalid}
        isEmpty={isEmpty}
        position="absolute"
        use="labelToInput"
        variant="w400-s14"
        withPlaceholder={withPlaceholder}
      >
        {inputProps.labelText}
      </Label>

      <InputMultiline
        as="textarea"
        disabled={disabled || inputProps?.disabled}
        focused={focused}
        id={inputProps.id}
        invalid={inputProps.invalid}
        isEmpty={isEmpty}
        name={inputProps.name}
        onBlur={handleOnBlur}
        onChange={(e) => {
          inputProps.onChange(e);
          handleOnChange(e);
        }}
        onFocus={handleOnFocus}
        paddingBottom="5px"
        placeholder={inputProps.placeholder}
        rows={inputProps.name === 'bio' ? 2 : 1}
        type={inputProps.type}
        use={inputProps.use}
        {...(inputProps.name === 'phone' && { use: 'assignment' })}
        value={inputProps.value}
        variant="w400-s16"
        width="100%"
        withPlaceholder={withPlaceholder}
      />
    </Flex>
  );
};

InputForm.defaultProps = {
  withPlaceholder: false,
  disabled: false
};

InputForm.propTypes = {
  inputProps: shape({
    name: string,
    type: string,
    use: string,
    id: string,
    placeholder: string,
    labelText: string,
    value: string.isRequired,
    onChange: func.isRequired,
    invalid: bool.isRequired
  }).isRequired,
  withPlaceholder: bool,
  disabled: bool
};

export default withFlexProps(InputForm);
