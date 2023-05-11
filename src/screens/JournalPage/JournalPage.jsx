import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Typography } from '@mixins';
import { DropdownMenu, Icon } from '@atoms';
import { ScreenWithHeader, ScreenWithBottomMessage } from '@templates';
import { JournalGeneralInfo, ChartModal } from '@molecules';
import { JournalComments } from '@organisms';
import { LOCALSTORAGE } from '@constants';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import { getJournalInfo } from '@store/journalPage/duck';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { getActualUserInfo } from '@store/authorization/duck';
import { getDataFromLS } from '@store/localStorage';
import { theme } from '@styles';
import enTexts from '@translations/en.json';
import { Loading } from '../Loading';
import { dropdownProps } from './JournalPage.layoutProps';

const JournalPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [commentInput, setCommentInput] = useState('');

  const changeCommentInput = (data) => {
    setCommentInput(data);
  };

  const journalID = parseInt(params.id, 10);
  const journal = useSelector((state) => state.journalPage.journal);
  const isPending = useSelector((state) => state.journalPage.isPending);
  const to = useSelector((state) => state.journalPage.replyTo);
  const user = useSelector((state) => state.authorization.userInfo);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancelButtonClick = () => {
    setIsModalVisible(false);
  };

  const memoDropdowns = useMemo(() =>
    dropdownProps.map((el) => (
      <DropdownMenu
        margin="16px"
        styleVariant="journal"
        title={el.title}
        {...(el?.renderChildren && {
          renderChildren: () => el.renderChildren(journal, handleOpenModal)
        })}
        key={el.id}
      />
    ))
  );
  useEffect(() => {
    const toLoad = async () => {
      const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
      const id = parseInt(token[token.length - 1], 10);
      await dispatch(getJournalInfo({ journalID }));
      await dispatch(getActualUserInfo({ token, id }));
    };
    toLoad();
  }, []);

  return (
    <>
      <Loading isLoadingVisible={isPending} />
      {isModalVisible && (
        <ChartModal
          data={journal.citescore.data}
          renderTitleComponent={() => (
            <Flex justifyContent="center" position="relative" width="100%">
              <Typography variant="w700-s18">
                {enTexts.claims.citeScoreTrend}
              </Typography>
              <Icon
                color={theme.colors.greyDark}
                height="24px"
                onClick={handleModalCancelButtonClick}
                position="absolute"
                right="0px"
                Svg={CloseButton}
                width="24px"
              />
            </Flex>
          )}
        />
      )}
      <ScreenWithHeader
        renderLeftComponent={() => (
          <Flex marginX="17px" marginY="16px">
            <BackButton
              onClick={() => {
                navigate(-1);
              }}
            />
          </Flex>
        )}
      >
        <ScreenWithBottomMessage
          changeCommentInput={changeCommentInput}
          commentInput={commentInput}
        >
          <JournalGeneralInfo
            handleOpenModal={handleOpenModal}
            journalInfo={{
              ...journal,
              isSubscribed:
                user.following.filter(
                  (fol) =>
                    fol.type_of_following === 'journal' && fol.id === journal.id
                )?.length !== 0
            }}
            margin="16px"
          />
          {memoDropdowns.map((el) => el)}
          <JournalComments
            comments={journal.comments || []}
            marginBottom={to === null ? '96px' : '126px'}
            marginX="16px"
          />
        </ScreenWithBottomMessage>
      </ScreenWithHeader>
    </>
  );
};

export default JournalPage;
