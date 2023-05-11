import React, { useMemo, useEffect, useState } from 'react';
import { Flex, Typography } from '@mixins';
import { Icon, Tabs, SuggestedContent } from '@atoms';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { theme } from '@styles';
import { AccountYouMayFollow, TrendingEvent } from '@molecules';
import enTexts from '@translations/en.json';
import { LOCALSTORAGE } from '@constants';
import { getDataFromLS } from '@store/localStorage';
import { getTrendingFeed } from '@store/trending/duck';
import { ScreenWithHeader } from '@templates';
import { ReactComponent as Logo } from '@svgs/logos/peerefLogo.svg';
import { ReactComponent as Mail } from '@svgs/icons/email.svg';
import { ReactComponent as Search } from '@svgs/icons/search.svg';
import { tabsLayoutProps } from './Home.layoutProps';
import { CarouselWithTabs } from '../CarouselWithTabs';

const Home = () => {
  const dispatch = useDispatch();
  const [modalItemId, settModalItemId] = useState(null);

  const trendingContent = useSelector(
    (state) => state.trending.trendingContent
  );

  const memoUserYouMayFollowList = useMemo(
    () =>
      trendingContent
        .filter((ev) => ev.flag === 'follow_suggestions')
        .map((eventInfo) => (
          <AccountYouMayFollow
            key={eventInfo.id}
            avatarUri={eventInfo.interactionObject.avatarUri || null}
            blueFollowButton
            institution={eventInfo.interactionObject?.institution || null}
            isFollowed={eventInfo.interactionObject.isFollowed}
            paddingBottom="14px"
            userName={eventInfo.interactionObject.userName}
            userSurname={eventInfo.interactionObject.userSurname}
          />
        )),
    [trendingContent]
  );

  const memoTrendingList = useMemo(
    () =>
      trendingContent
        .filter(
          (ev) => ev.flag !== 'create_hub' && ev.flag !== 'follow_suggestions'
        )
        .map((eventInfo) => (
          <TrendingEvent
            key={eventInfo.id}
            eventInfo={eventInfo}
            marginTop="12px"
          />
        )),
    [trendingContent]
  );

  const memoRecentTrendingList = useMemo(
    () =>
      trendingContent
        .filter(
          (ev) =>
            ev.flag !== 'create_hub' &&
            ev.flag !== 'follow_suggestions' &&
            (ev.dateOfPublication.includes('weeks') ||
              ev.dateOfPublication.includes('days'))
        )
        .map((eventInfo) => (
          <TrendingEvent
            key={eventInfo.id}
            eventInfo={eventInfo}
            marginTop="12px"
          />
        )),
    [trendingContent]
  );

  const memoSuggestedList = useMemo(
    () =>
      trendingContent
        .filter((ev) => ev.flag === 'create_hub')
        .map((eventInfo, index) => (
          <Flex
            {...(index !==
              trendingContent.filter((ev) => ev.flag === 'create_hub').length -
                1 && {
              paddingBottom: '24px',
              borderBottom: '1px solid',
              borderBottomColor: 'greyLine'
            })}
            key={eventInfo.id}
            paddingTop="24px"
            width="100%"
          >
            <SuggestedContent
              key={eventInfo.id}
              eventInfo={eventInfo}
              onClick={() => settModalItemId(eventInfo.id)}
            />
          </Flex>
        )),
    [trendingContent]
  );

  useEffect(() => {
    const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
    const id = parseInt(token[token.length - 1], 10);
    dispatch(getTrendingFeed({ userID: id }));
  }, []);

  const [temporaryContent, setTemporaryContent] = useState(
    <Flex flexDirection="column">{memoTrendingList.map((el) => el)}</Flex>
  );

  const changeContent = (id) => {
    if (id === 1) {
      setTemporaryContent(
        <Flex flexDirection="column">{memoTrendingList.map((el) => el)}</Flex>
      );
    }

    if (id === 2) {
      setTemporaryContent(
        <Flex flexDirection="column">
          {memoRecentTrendingList.map((el) => el)}

          <Flex backgroundColor="greySeparator" height="8px" width="100%" />

          <Flex flexDirection="column" paddingY="24px">
            <Typography variant="w700-s18">
              {enTexts.claims.suggestedForYou}
            </Typography>
            {memoSuggestedList.map((el) => el)}
          </Flex>

          <Flex backgroundColor="greySeparator" height="8px" width="100%" />

          <Flex flexDirection="column" paddingY="24px">
            <Typography marginBottom="14px" variant="w700-s18">
              {enTexts.claims.peopleYouMayFollow}
            </Typography>
            {memoUserYouMayFollowList.map((el) => el)}
          </Flex>
        </Flex>
      );
    }
  };

  return (
    <ScreenWithHeader
      renderHeaderChildren={() => (
        <Flex marginTop="21px">
          <Tabs
            activeTypographySize="w700-s16"
            changeContent={changeContent}
            tabsProps={tabsLayoutProps}
            typographySize="w400-s16"
            width="100%"
          />
        </Flex>
      )}
      renderLeftComponent={() => (
        <Icon
          color={theme.colors.orange}
          height="32px"
          marginX="17px"
          Svg={Logo}
          width="112px"
        />
      )}
      renderRightComponent={() => (
        <Flex margin="16px">
          <Icon height="24px" marginRight="24px" Svg={Search} width="24px" />
          <Icon height="24px" Svg={Mail} width="24px" />
        </Flex>
      )}
    >
      {modalItemId && (
        <CarouselWithTabs
          dataProps={trendingContent.filter((ev) => ev.flag === 'create_hub')}
          pageId={modalItemId}
          setPageId={settModalItemId}
        />
      )}
      <Flex marginBottom="53.5px" marginLeft="16px" marginRight="17px">
        {temporaryContent}
      </Flex>
    </ScreenWithHeader>
  );
};

export default Home;
