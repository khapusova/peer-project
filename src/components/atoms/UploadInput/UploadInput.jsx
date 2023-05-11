import React from 'react';
import { Flex, Input } from '@mixins';
import { withFlexProps } from '@hocs';
import { ReactComponent as UploadButton } from '@svgs/buttons/upload.svg';
import { func } from 'prop-types';

const UploadInput = ({ handleOnSelect }) => (
  <Flex
    alignItems="center"
    border="1px solid"
    borderRadius="6px"
    borderStyle="dashed"
    display="inline-flex"
    justifyContent="center"
    position="relative"
  >
    <Flex position="absolute">
      <UploadButton />
    </Flex>
    <Input
      height="109px"
      onChange={handleOnSelect}
      opacity="0%"
      type="file"
      width="109px"
    />
  </Flex>
);

UploadInput.propTypes = {
  handleOnSelect: func.isRequired
};

export default withFlexProps(UploadInput);
