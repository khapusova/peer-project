import React from 'react';
import { Typography } from '@mixins';
import { withFlexProps } from '@hocs';
import { bool, string } from 'prop-types';
import { FlexWithVariants } from './ChatMessage.styles';

const ChatMessage = ({ isIncoming, content }) => (
  <FlexWithVariants variant={isIncoming ? 'incoming' : 'outcoming'}>
    <Typography paddingX="12px" paddingY="6px" variant="w400-s17">
      {content}
    </Typography>
  </FlexWithVariants>
);

ChatMessage.propTypes = {
  isIncoming: bool.isRequired,
  content: string.isRequired
};

export default withFlexProps(ChatMessage);
