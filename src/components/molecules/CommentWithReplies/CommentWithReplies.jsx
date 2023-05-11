import React, { useMemo } from 'react';
import { withFlexProps } from '@hocs';
import { Flex } from '@mixins';
import { arrayOf, shape, string } from 'prop-types';
import { theme } from '@styles';
import { Comment } from '../Comment';

const CommentWithReplies = ({ generalCommentInfo }) => {
  const isWithReplies = generalCommentInfo?.replies?.length !== 0;
  const memoReplies = useMemo(
    () =>
      generalCommentInfo.replies.map((comment, index) => (
        <Comment
          key={comment.comment_id}
          {...(index !== generalCommentInfo.replies.length - 1 && {
            borderBottom: `1px solid ${theme.colors.greyLine}`,
            marginBottom: '16px',
            paddingBottom: '16px'
          })}
          commentInfo={comment}
          replyComment
        />
      )),
    [generalCommentInfo]
  );

  return (
    <Flex flexDirection="column" width="100%">
      <Comment commentInfo={generalCommentInfo} />
      <Flex
        {...(isWithReplies && {
          borderY: `1px solid ${theme.colors.greyLine}`
        })}
        {...(!isWithReplies && {
          borderBottom: `1px solid ${theme.colors.greyLine}`
        })}
        marginY="16px"
      >
        <Flex flexDirection="column" marginLeft="33px" marginY="16px">
          {memoReplies.map((el) => el)}
        </Flex>
      </Flex>
    </Flex>
  );
};

CommentWithReplies.propTypes = {
  generalCommentInfo: shape({
    content: string,
    dateOfPublication: string,
    likedBy: arrayOf(shape)
  }).isRequired
};

export default withFlexProps(CommentWithReplies);
