import React, { useMemo } from 'react';
import { arrayOf, shape, string, func, bool } from 'prop-types';
import { Flex } from '@mixins';
import { InputForm } from '@atoms';

const InputsForm = ({ inputsProps, marginBetween }) => {
  const memoInputs = useMemo(
    () =>
      inputsProps.map((inpProps, index) => (
        <InputForm
          key={inpProps.id}
          {...(inpProps.placeholder && { withPlaceholder: true })}
          inputProps={inpProps}
          {...(inputsProps.length !== index + 1 && {
            marginBottom: marginBetween
          })}
        />
      )),
    [inputsProps]
  );

  return <Flex flexDirection="column">{memoInputs.map((inp) => inp)}</Flex>;
};

InputsForm.propTypes = {
  inputsProps: arrayOf(
    shape({
      name: string.isRequired,
      type: string.isRequired,
      use: string,
      id: string.isRequired,
      labelText: string,
      value: string.isRequired,
      onChange: func.isRequired,
      invalid: bool.isRequired
    })
  ).isRequired,
  marginBetween: string.isRequired
};

export default InputsForm;
