/* eslint-disable global-require */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Flex, Button, Image } from '@mixins';
import { Tabs, Welcome } from '@atoms';
import { OnboardingItems } from '@molecules';
import { ScreenWithHeader } from '@templates';
import { ROUTES, LOCALSTORAGE } from '@constants';
import { useNavigate, useLocation } from 'react-router-dom';
import enTexts from '@translations/en.json';
import { getDataFromLS } from '@store/localStorage';
import {
  getActualUserInfo,
  setUserData,
  setPassedOnboarding
} from '@store/authorization/duck';
import { getAllExploringData } from '@store/exploring/duck';
import { Loading } from '../Loading';
import {
  tabsProps,
  exploringProps,
  areasProps
} from './Onboarding.layoutProps';

const Onboarding = () => {
  const [pageId, setPageId] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.authorization.userInfo);

  const [areas, setAreas] = useState(
    userInfo?.areasOfInterest?.split(',') || []
  );
  const [following, setFollowing] = useState(userInfo.following || []);
  const [funding, setFunding] = useState([]);
  const [exploring, setExploring] = useState([]);

  const allJournals = useSelector((state) => state.exploring.all.journals);
  const allFunding = useSelector((state) => state.exploring.all.funding);
  const isPending = useSelector((state) => state.exploring.isPending);

  const goNext = () => {
    setPageId((prev) => {
      if (prev < 4) {
        return prev + 1;
      }
      return prev;
    });
  };

  useEffect(() => {
    const onLoad = async () => {
      const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
      const id = parseInt(token[token.length - 1], 10);
      await dispatch(getActualUserInfo({ token, id }));
    };

    onLoad();
  }, []);

  const journalProps = useMemo(
    () =>
      allJournals.map((el, index) => ({
        id: index,
        title: el.name,
        icon: (
          <Image
            alt={null}
            height="112px"
            src={
              el?.avatarUri ||
              require('@pngs/mockedAvatars/defaultJournalAvatar.png')
            }
            width="83px"
          />
        )
      })),
    [allJournals]
  );

  const fundingProps = useMemo(
    () =>
      allFunding.map((el, index) => ({
        id: index,
        title: el.name,
        icon: (
          <Image
            alt={null}
            height="112px"
            src={
              el?.avatarUri ||
              require('@pngs/mockedAvatars/defaultJournalAvatar.png')
            }
            width="83px"
          />
        )
      })),
    [allFunding]
  );

  const memoContentArray = useMemo(
    () => [
      {
        pageId: 0,
        content: <Welcome />,
        handleOnNext: goNext
      },
      {
        pageId: 1,
        content: (
          <OnboardingItems
            items={areas}
            pageProps={areasProps}
            setItems={setAreas}
            typeOfItems="area"
          />
        ),
        handleOnNext: () => {
          dispatch(
            setUserData({
              id: userInfo.id,
              areasOfInterest: areas.toString()
            })
          );
          goNext();
        }
      },
      {
        pageId: 2,
        content: (
          <OnboardingItems
            items={following}
            pageProps={journalProps}
            setItems={setFollowing}
            typeOfItems="journals"
          />
        ),
        handleOnNext: () => {
          dispatch(
            setUserData({
              id: userInfo.id,
              following
            })
          );
          goNext();
        }
      },
      {
        pageId: 3,
        content: (
          <OnboardingItems
            items={funding}
            pageProps={fundingProps}
            setItems={setFunding}
            typeOfItems="funding"
          />
        ),
        handleOnNext: goNext
      },
      {
        pageId: 4,
        content: (
          <OnboardingItems
            items={exploring}
            pageProps={exploringProps}
            setItems={setExploring}
            typeOfItems="exploring"
          />
        ),
        handleOnNext: () => {
          if (location.state?.from === 'passwordVerification') {
            navigate(ROUTES.profile, {
              state: { from: 'passwordVerification' }
            });
          } else {
            navigate(ROUTES.profile);
          }
          dispatch(setPassedOnboarding({ id: userInfo.id }));
          goNext();
        }
      }
    ],
    [
      exploring,
      exploringProps,
      funding,
      fundingProps,
      journalProps,
      following,
      areas,
      areasProps
    ]
  );

  useEffect(() => {
    dispatch(getAllExploringData());
  }, []);

  return (
    <>
      <Loading isLoadingVisible={isPending} />
      <ScreenWithHeader renderCenterComponent={() => <Flex />}>
        {pageId !== 0 && (
          <>
            <Flex justifyContent="center" marginY="30px" width="100%">
              <Flex width="100%" />
              <Tabs
                changeContent={(ID) => {
                  setPageId(ID);
                }}
                justifyContent="center"
                tabID={pageId}
                tabsProps={tabsProps}
                width="100%"
                withoutText
              />
              <Flex justifyContent="end" marginRight="16px" width="100%">
                <Typography
                  color="greyDark"
                  onClick={() => {
                    navigate(ROUTES.profile);
                  }}
                  variant="w400-s16"
                >
                  {enTexts.buttonNames.skip}
                </Typography>
              </Flex>
            </Flex>
            <Typography marginX="40px" textAlign="center" variant="w700-s24">
              {tabsProps[pageId - 1]?.title}
            </Typography>
          </>
        )}

        {memoContentArray[pageId].content}
        <Flex
          marginBottom="30px"
          marginLeft="17px"
          marginRight="16px"
          marginTop="75px"
        >
          <Button
            onClick={memoContentArray[pageId].handleOnNext}
            paddingY="13px"
            variant="primary"
            width="100%"
          >
            <Typography variant="w700-s16">
              {pageId === 4
                ? enTexts.buttonNames.finish
                : enTexts.buttonNames.next}
            </Typography>
          </Button>
        </Flex>
      </ScreenWithHeader>
    </>
  );
};

export default Onboarding;
