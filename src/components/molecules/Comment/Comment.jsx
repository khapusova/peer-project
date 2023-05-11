import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reactOnComment } from '@store/journalPage/duck';
import { Flex, Typography, Image } from '@mixins';
import { Icon, ShowMore } from '@atoms';
import { withFlexProps } from '@hocs';
import { journalPageActions } from '@store/journalPage';
import { ReactComponent as DefaultAvatar } from '@svgs/icons/defaultAvatar.svg';
import { ReactComponent as ReplyButton } from '@svgs/buttons/reply.svg';
import { ReactComponent as Like } from '@svgs/buttons/like.svg';
import { ReactComponent as Liked } from '@svgs/buttons/liked.svg';
import { arrayOf, bool, shape, string } from 'prop-types';
import enTexts from '@translations/en.json';
import { AnimatedFlex } from './Comment.styles';

const Comment = ({ commentInfo, replyComment }) => {
  const [isMenuShowed, setIsMenuShowed] = useState(false);
  const [visibleWithAnimation, setVisibleWithAnimation] =
    useState(isMenuShowed);
  const inversedAnimationState = !visibleWithAnimation && isMenuShowed;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [yCommentPosition, setYCommentPosition] = useState();
  const [onTopPosition, setOnTopPosition] = useState(
    yCommentPosition - scrollPosition - 50 > 0
  );

  const positionRef = useRef();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    getPosition();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (yCommentPosition - scrollPosition - 50 > 0) {
      if (!onTopPosition) {
        setOnTopPosition(true);
      }
    } else if (onTopPosition) {
      setOnTopPosition(false);
    }
  }, [scrollPosition, yCommentPosition]);

  useEffect(() => {
    if (!isMenuShowed) {
      setTimeout(() => {
        setVisibleWithAnimation(false);
      }, 750);
    } else {
      setVisibleWithAnimation(true);
    }
  }, [isMenuShowed]);

  const getPosition = () => {
    const yPosition = positionRef.current.offsetTop;
    setYCommentPosition(yPosition);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authorization.userInfo);
  const journal = useSelector((state) => state.journalPage.journal);

  const showMenu = () => {
    setIsMenuShowed(!isMenuShowed);
  };

  const isCommentLiked = commentInfo.likedBy
    .map((el) => el.id)
    .includes(user.id);

  const dislikeComment = () => {
    dispatch(
      reactOnComment({
        journalID: journal.id,
        commentID: commentInfo.comment_id,
        userData: {
          name: `${user.userName} ${user.userSurname}`,
          id: user.id
        },
        action: 'dislike'
      })
    );
  };

  const likeComment = () => {
    dispatch(
      reactOnComment({
        journalID: journal.id,
        commentID: commentInfo.comment_id,
        userData: {
          name: `${user.userName} ${user.userSurname}`,
          id: user.id
        },
        action: 'like'
      })
    );
  };

  const setReplyState = () => {
    dispatch(
      journalPageActions.setReplyComment({
        author: commentInfo?.author?.name || enTexts.claims.anonymousUser,
        comment_id: commentInfo.comment_id
      })
    );
  };

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <Flex height="32px" marginRight="6px" width="32px">
          {commentInfo?.author?.avatarUri ? (
            <Image
              alt={null}
              borderRadius="50%"
              height="100%"
              src={commentInfo?.author?.avatarUri}
              width="100%"
            />
          ) : (
            <Icon height="32px" Svg={DefaultAvatar} width="32px" />
          )}
        </Flex>
        <Typography color="greyIconsText" variant="w700-s14">
          {commentInfo?.author?.name || enTexts.claims.anonymousUser}
        </Typography>
      </Flex>
      <Flex ref={positionRef} position="relative">
        <AnimatedFlex
          backgroundColor="black"
          borderRadius="6px"
          onClick={() => {
            navigator.clipboard.writeText(commentInfo.content);
            setIsMenuShowed(false);
          }}
          padding="5px"
          position="absolute"
          right="50%"
          {...(onTopPosition ? { top: '-15px' } : { bottom: '-50px' })}
          {...(inversedAnimationState
            ? {
                visible: visibleWithAnimation,
                visibleWithAnimation: isMenuShowed
              }
            : {
                visible: isMenuShowed,
                visibleWithAnimation
              })}
        >
          <Typography color="white" variant="w400-s14">
            {enTexts.buttonNames.copy}
          </Typography>
        </AnimatedFlex>
        <ShowMore
          fullText={commentInfo.content}
          marginTop="6px"
          onTextClick={showMenu}
          {...(replyComment && {
            replyCommentTo:
              commentInfo?.to?.author || enTexts.claims.anonymousUser
          })}
        />
      </Flex>
      <Flex alignItems="center" color="greyIconsText" marginTop="10px">
        <Typography variant="w300-s12">
          {commentInfo.dateOfPublication}
        </Typography>
        <Flex
          alignItems="center"
          marginX="32px"
          onClick={isCommentLiked ? dislikeComment : likeComment}
        >
          {isCommentLiked ? <Liked /> : <Like />}
          <Typography marginLeft="5px">
            {commentInfo?.likedBy?.length}
          </Typography>
        </Flex>
        <Flex>
          <ReplyButton onClick={setReplyState} />
          <Typography marginLeft="6px" variant="w400-s14">
            {enTexts.buttonNames.reply}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

Comment.defaultProps = {
  replyComment: false
};

Comment.propTypes = {
  commentInfo: shape({
    content: string,
    dateOfPublication: string,
    likedBy: arrayOf(shape)
  }).isRequired,
  replyComment: bool
};

export default withFlexProps(Comment);
