import React, { useMemo } from 'react';
import { ChatMessage } from '@atoms';
import { getDataFromLS } from '@store/localStorage';
import { withFlexProps } from '@hocs';
import { Flex } from '@mixins';
import { arrayOf, shape } from 'prop-types';
import { LOCALSTORAGE } from '@constants';

const ChatMessages = ({ allMessages }) => {
  const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
  const id = parseInt(token[token.length - 1], 10);

  const memoMessages = useMemo(
    () =>
      allMessages.map((message, index) => (
        <ChatMessage
          key={message.messageId}
          content={message.content.data}
          isIncoming={message.fromId !== id}
          justifyContent={message.fromId !== id ? 'start' : 'end'}
          marginBottom={
            index !== allMessages.length - 1 &&
            allMessages[index + 1].fromId === allMessages[index].fromId
              ? '10px'
              : '24px'
          }
        />
      )),
    [id, allMessages]
  );

  return (
    <Flex flexDirection="column" width="100%">
      {memoMessages.map((mes) => mes)}
    </Flex>
  );
};

ChatMessages.propTypes = {
  allMessages: arrayOf(shape()).isRequired
};

export default withFlexProps(ChatMessages);
