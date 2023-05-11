import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ChatMessages } from '@molecules';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromLS } from '@store/localStorage';
import { api } from '@store/authorization/api';
import { getActualUserInfo } from '@store/authorization/duck';
import { Button, Typography } from '@mixins';
import { ScreenWithHeader, ScreenWithBottomMessage } from '@templates';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { ReactComponent as More } from '@svgs/icons/more.svg';
import { LOCALSTORAGE } from '@constants';
import { db } from './Chat.layoutProps';

const Chat = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [commentInput, changeCommentInput] = useState('');
  const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
  const id = parseInt(token[token.length - 1], 10);
  const [userInfo, setUserInfo] = useState(
    useSelector((state) => state.authorization.userInfo)
  );

  const getMessages = useMemo(() => {
    const [user] = db.filter((el) => el.id === id);
    if (!user) {
      return null;
    }
    const [messages] = user.chats.filter((chat) => chat.id === userInfo.id);
    return messages?.messages;
  }, [db, id, userInfo.id]);

  useEffect(() => {
    const onLoad = async () => {
      const result = await api.getUserById({ id: parseInt(params.id, 10) });
      setUserInfo(result);
      await dispatch(getActualUserInfo({ token, id }));
    };

    onLoad();
  }, []);
  return (
    <ScreenWithHeader
      renderCenterComponent={() => (
        <Typography variant="w700-s18">{`${userInfo.userName} ${userInfo.userSurname}`}</Typography>
      )}
      renderLeftComponent={() => (
        <Button
          backgroundColor="none"
          display="flex"
          marginX="17px"
          marginY="16px"
          padding="0px"
        >
          <CloseButton />
        </Button>
      )}
      renderRightComponent={() => (
        <Button
          backgroundColor="none"
          display="flex"
          marginX="17px"
          marginY="16px"
          padding="0px"
        >
          <More />
        </Button>
      )}
    >
      <ScreenWithBottomMessage
        changeCommentInput={changeCommentInput}
        chatMessage
        commentInput={commentInput}
      >
        {getMessages && (
          <ChatMessages
            allMessages={getMessages}
            marginLeft="17px"
            marginRight="16px"
            marginTop="23px"
          />
        )}
      </ScreenWithBottomMessage>
    </ScreenWithHeader>
  );
};

export default Chat;
