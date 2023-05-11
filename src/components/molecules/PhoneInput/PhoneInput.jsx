import React, { useState } from 'react';
import { Button, Flex, Typography } from '@mixins';
import { withFlexProps } from '@hocs';
import { Icon } from '@atoms';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { PHONECODES } from '@constants';
import enTexts from '@translations/en.json';
import { bool, func, shape, string } from 'prop-types';
import { BottomSwipeModal } from '../BottomSwipeModal';
import { Label, InputMultiline } from './PhoneInput.styles';
import { phoneFormat } from './PhoneInput.helpers';

const PhoneInput = ({
  phoneInputProps,
  phoneCode,
  setPhoneCode,
  setEditPhoneMode,
  existingValue
}) => {
  const [focused, setFocused] = useState(false);
  const [isCountryCodeModalVisible, setIsCountryCodeModalVisible] = useState(
    phoneCode.length === 0
  );

  const [formattedInput, setFormattedInput] = useState(existingValue || '');

  const handleOpenCountryCodeModal = () => {
    setIsCountryCodeModalVisible(true);
    setEditPhoneMode(true);
  };

  const handleCountryCodeModalCancelButtonClick = () => {
    setIsCountryCodeModalVisible(false);
    if (formattedInput.length === 0) {
      setEditPhoneMode(false);
    }
  };

  const handleOnFocus = () => {
    setFocused(true);
  };

  const handleOnBlur = () => {
    setFocused(false);
  };

  const handleOnChange = (e) => {
    setFormattedInput(phoneFormat(e.target.value));
    phoneInputProps.onChange(e);
  };
  const getColor = (invalid) => {
    if (invalid) return 'red';
    return 'greyLineText';
  };

  return (
    <>
      <BottomSwipeModal
        data={PHONECODES.map((obj) => `${obj.name}(${obj.code})`)}
        handleOnSelectOption={(data) => {
          const code = data.match(/\(([^)]+)\)/)[1];
          setPhoneCode(code);
          setIsCountryCodeModalVisible(false);
        }}
        renderTitleComponent={() => (
          <Flex position="relative">
            <Button
              backgroundColor="none"
              left="-15px"
              onClick={handleCountryCodeModalCancelButtonClick}
              padding="0px"
              position="absolute"
              top="-3px"
              type="button"
            >
              <Icon height="32px" Svg={CloseButton} width="32px" />
            </Button>
            <Typography marginX="auto" variant="w700-s18">
              {enTexts.claims.selectCountryCode}
            </Typography>
          </Flex>
        )}
        visible={isCountryCodeModalVisible}
      />
      <Flex
        borderBottom="1px solid"
        borderBottomColor={
          focused ? 'blueCta' : getColor(phoneInputProps.invalid)
        }
        height="34px"
        {...(phoneCode.length !== 0 && { paddingBottom: '8px' })}
        position="relative"
        width="100%"
      >
        {phoneCode && (
          <Button
            backgroundColor="none"
            border="1px solid"
            borderColor="greyLineText"
            borderRadius="3px"
            display="flex"
            onClick={handleOpenCountryCodeModal}
            padding="0px"
            type="button"
          >
            <Typography margin="6px" variant="w400-s16">
              {phoneCode}
            </Typography>
          </Button>
        )}
        <Label
          focused={focused}
          invalid={phoneInputProps.invalid}
          isEmpty={phoneCode.length === 0}
          position="absolute"
          use="labelToInput"
          variant="w400-s14"
        >
          {phoneInputProps.labelText}
        </Label>

        <InputMultiline
          {...phoneInputProps}
          border="none"
          focused={focused}
          isEmpty={phoneCode.length === 0}
          marginLeft="12px"
          maxLength="20"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClick={phoneCode.length !== 0 ? null : handleOpenCountryCodeModal}
          onFocus={handleOnFocus}
          placeholder={phoneCode.length === 0 ? '' : '(___)-__-__-__'}
          rows={1}
          type="text"
          value={formattedInput}
          variant="w400-s16"
        />
      </Flex>
    </>
  );
};

PhoneInput.propTypes = {
  phoneInputProps: shape({
    type: string.isRequired,
    id: string.isRequired,
    name: string.isRequired,
    use: string,
    labelText: string,
    onChange: func.isRequired,
    value: string,
    invalid: bool.isRequired
  }).isRequired,
  phoneCode: string.isRequired,
  setPhoneCode: func.isRequired,
  setEditPhoneMode: func.isRequired,
  existingValue: string.isRequired
};

export default withFlexProps(PhoneInput);
