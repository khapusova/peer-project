import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGeneralComment, addReplyComment } from '@store/journalPage/duck';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Flex, Typography, Input } from '@mixins';
import { journalPageActions } from '@store/journalPage';
import { RoundCheckbox } from '@atoms';
import { func, PropTypes, string, bool } from 'prop-types';
import { ReactComponent as Send } from '@svgs/buttons/send.svg';
import { ReactComponent as FilledCloseButton } from '@svgs/buttons/close_filled.svg';
import { ROUTES } from '@constants';
import enTexts from '@translations/en.json';
import FixedFlex from './ScreenWithBottomMessage.styles';

const ScreenWithBottomMessage = ({
  children,
  changeCommentInput,
  commentInput,
  chatMessage
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anonymously, setAnonymously] = useState(false);
  const user = useSelector((state) => state.authorization.userInfo);
  const journal = useSelector((state) => state.journalPage.journal);
  const replyTo = useSelector((state) => state.journalPage.replyTo);

  const handleOnCommentChange = (e) => {
    changeCommentInput(e.target.value);
  };

  const handleOnAnonymouslyChange = (e) => {
    setAnonymously(e.target.checked);
  };

  const sendComment = () => {
    if (commentInput.length !== 0) {
      if (replyTo === null) {
        dispatch(
          addGeneralComment({
            journalID: journal.id,
            author: {
              name: anonymously ? null : `${user.userName} ${user.userSurname}`,
              id: user.id
            },
            content: commentInput
          })
        );
      } else {
        dispatch(
          addReplyComment({
            journalID: journal.id,
            author: {
              name: anonymously ? null : `${user.userName} ${user.userSurname}`,
              id: user.id
            },
            content: commentInput,
            replyTo
          })
        );
        dispatch(journalPageActions.resetGeneralComment());
      }
    }
    changeCommentInput('');
  };

  useEffect(() => {
    if (pathname === ROUTES.root) {
      navigate(ROUTES.profile);
    }
  });

  return (
    <Flex display="block" width="100%">
      {children}
      <Outlet />
      <FixedFlex
        backgroundColor="white"
        bottom="0px"
        boxShadow="0px -0.5px 10px rgba(133, 147, 161, 0.4)"
        flexDirection="column"
        position="fixed"
        width="100%"
      >
        {replyTo && (
          <Flex
            backgroundColor="darkWhite"
            justifyContent="space-between"
            paddingTop="5px"
            paddingX="16px"
          >
            <Flex>
              <Typography marginRight="8px" variant="w400-s16">
                to
              </Typography>
              <Typography
                color="blueCta"
                display="flex"
                fontFamily="Consolas"
                variant="w400-s16"
              >
                {`@${replyTo.author}`}
              </Typography>
            </Flex>
            <FilledCloseButton
              onClick={() => dispatch(journalPageActions.resetGeneralComment())}
            />
          </Flex>
        )}
        <Flex padding="16px" {...(chatMessage && { marginBottom: '29px' })}>
          <Input
            marginRight="8px"
            onChange={handleOnCommentChange}
            placeholder={
              enTexts.placeholders[chatMessage ? 'writeMessage' : 'addComment']
            }
            use="assignment"
            value={commentInput}
            variant="w400-s17"
            width="100%"
          />
          <Send onClick={sendComment} />
        </Flex>
        <Flex alignItems="center" paddingBottom="24px" paddingX="16px">
          <RoundCheckbox
            checked={anonymously}
            handleOnChange={handleOnAnonymouslyChange}
            id="post_anonymously"
          />
          <Typography marginLeft="8px" variant="w400-s14">
            {enTexts.claims.postAnonymously}
          </Typography>
        </Flex>
      </FixedFlex>
      {!chatMessage && (
        <Flex alignItems="center" paddingBottom="24px" paddingX="16px">
          <RoundCheckbox
            checked={anonymously}
            handleOnChange={handleOnAnonymouslyChange}
            id="post_anonymously"
          />
          <Typography marginLeft="8px" variant="w400-s14">
            {enTexts.claims.postAnonymously}
          </Typography>
        </Flex>
      )}
    </Flex>
  );
};

ScreenWithBottomMessage.defaultProps = {
  children: null,
  chatMessage: false
};

ScreenWithBottomMessage.propTypes = {
  children: PropTypes.node,
  changeCommentInput: func.isRequired,
  commentInput: string.isRequired,
  chatMessage: bool
};

export default ScreenWithBottomMessage;
