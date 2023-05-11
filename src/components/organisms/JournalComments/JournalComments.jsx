import React, { useMemo } from 'react';
import { Flex, Typography } from '@mixins';
import { CommentWithReplies } from '@molecules';
import { withFlexProps } from '@hocs';
import { arrayOf, shape } from 'prop-types';
import enTexts from '@translations/en.json';
import { getTotalCommentsQuantity } from './JournalComments.helper';

const JournalComments = ({ comments }) => {
  const totalCommentsQuantity = getTotalCommentsQuantity(comments);

  const memoComments = useMemo(
    () =>
      comments.map((comment) => (
        <CommentWithReplies
          key={comment.comment_id}
          generalCommentInfo={comment}
        />
      )),
    [comments]
  );

  return (
    <Flex flexDirection="column">
      <Typography color="greyIconsText" marginY="16px" variant="w400-s12">
        {`${enTexts.claims.comments} (${totalCommentsQuantity})`}
      </Typography>
      {memoComments.map((el) => el)}
    </Flex>
  );
};

JournalComments.propTypes = {
  comments: arrayOf(shape({})).isRequired
};
export default withFlexProps(JournalComments);
