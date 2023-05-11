/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Tabs, Icon, Journals, Articles, Funding } from '@atoms';
import { Hubs, BottomSwipeModal } from '@molecules';
import { Researchers, ExploreMenu } from '@organisms';
import { ScreenWithHeader } from '@templates';

import { LOCALSTORAGE } from '@constants';
import { getDataFromLS } from '@store/localStorage';
import { Flex, Typography, Input, Button } from '@mixins';

import { theme } from '@styles';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import { ReactComponent as Search } from '@svgs/icons/search.svg';
import { ReactComponent as Logo } from '@svgs/logos/peerefLogo.svg';
import { ReactComponent as Mail } from '@svgs/icons/email.svg';
import { ReactComponent as FilledCloseButton } from '@svgs/buttons/close_filled.svg';

import enTexts from '@translations/en.json';
import {
  getAllExploringData,
  getSearchingHistory,
  addToSearchHistory,
  deleteSearchHistory
} from '@store/exploring/duck';

import { Loading } from '../Loading';
import { tabsLayoutProps } from './Explore.layoutProps';
import { XScrolledFlex } from './Explore.styles';
import { searchAllData } from './Explore.helper';

const Explore = () => {
  const dispatch = useDispatch();

  const allInitialData = useSelector((state) => state.exploring.all);
  const userSearchHistory = useSelector(
    (state) => state.exploring.searchHistory
  );

  const [menuMode, setMenuMode] = useState(true);

  const [allData, setAllData] = useState(allInitialData);
  const [initialTab, setInitialTab] = useState(null);

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const [inputData, setInputData] = useState('');

  const isPending = useSelector((state) => state.exploring.isPending);

  const [temporaryContent, setTemporaryContent] = useState(
    <>
      <Journals flexDirection="column" journalsList={allData.journals} />
      <Articles articlesList={allData.articles} flexDirection="column" />
      <Funding flexDirection="column" fundingList={allData.funding} />
      <Hubs flexDirection="column" hubsList={allData.hubs} />
      <Researchers
        flexDirection="column"
        researchersList={allData.researchers}
      />
    </>
  );

  const { token } = getDataFromLS(LOCALSTORAGE.activeUser);
  const userID = parseInt(token[token.length - 1], 10);

  const changeContentDependOnTabs = (id) => {
    if (id === 1) {
      setTemporaryContent(
        <>
          <Journals flexDirection="column" journalsList={allData.journals} />
          <Articles articlesList={allData.articles} flexDirection="column" />
          <Funding flexDirection="column" fundingList={allData.funding} />
          <Hubs flexDirection="column" hubsList={allData.hubs} />
          <Researchers
            flexDirection="column"
            researchersList={allData.researchers}
          />
        </>
      );
    }
    if (id === 2) {
      setTemporaryContent(
        <Journals flexDirection="column" journalsList={allData.journals} />
      );
    }
    if (id === 3) {
      setTemporaryContent(
        <Articles articlesList={allData.articles} flexDirection="column" />
      );
    }
    if (id === 4) {
      setTemporaryContent(
        <Funding flexDirection="column" fundingList={allData.funding} />
      );
    }
    if (id === 5) {
      setTemporaryContent(
        <Hubs flexDirection="column" hubsList={allData.hubs} />
      );
    }
    if (id === 6) {
      setTemporaryContent(
        <Researchers
          flexDirection="column"
          researchersList={allData.researchers}
        />
      );
    }
  };

  const handleOnInputChange = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    const onLoad = async () => {
      await dispatch(getAllExploringData());
      await dispatch(getSearchingHistory({ userID }));
    };
    onLoad();
  }, []);

  const handleBackButtonClick = () => {
    setMenuMode(true);
  };

  const handleOnDeleteHistory = () => {
    dispatch(deleteSearchHistory({ userID }));
  };

  const handleSearchModalSearchButtonClick = () => {
    dispatch(addToSearchHistory({ userID, dataToSet: inputData }));
    setIsSearchModalVisible(false);
    setAllData(searchAllData(inputData, allInitialData));
  };

  const handleSearchModalCancelButtonClick = () => {
    setIsSearchModalVisible(false);
  };

  const clearInput = () => {
    setInputData('');
    setAllData(allInitialData);
  };

  const handleOnSelectOption = (data) => {
    setInputData(data);
    setIsSearchModalVisible(false);
    setAllData(searchAllData(data, allInitialData));
  };

  const handleOpenSearchModal = () => setIsSearchModalVisible(true);

  const handleOpenDefiniteTab = (keyWord) => {
    const [{ id }] = tabsLayoutProps.filter((el) =>
      el.key_word.includes(keyWord)
    );
    setInitialTab(id);
    setMenuMode(false);
  };

  return (
    <>
      <Loading isLoadingVisible={isPending} />
      <BottomSwipeModal
        data={userSearchHistory}
        handleOnDeleteHistory={handleOnDeleteHistory}
        handleOnSelectOption={handleOnSelectOption}
        renderTitleComponent={() => (
          <Flex flexDirection="column" paddingTop="21px" paddingX="16px">
            <Flex>
              <Flex
                alignItems="center"
                backgroundColor="greyLight"
                borderRadius="5px"
                marginRight="16px"
                position="relative"
                width="100%"
              >
                <Icon
                  color="greyIconsText"
                  height="18px"
                  paddingX="8px"
                  Svg={Search}
                  width="18px"
                />
                <Input
                  onChange={handleOnInputChange}
                  paddingY="7px"
                  placeholder={enTexts.placeholders.searchByKeywords}
                  use="search"
                  value={inputData}
                  variant="w400-s16"
                  width="100%"
                />
                {inputData.length !== 0 && (
                  <Button
                    backgroundColor="none"
                    onClick={clearInput}
                    position="absolute"
                    right="0px"
                  >
                    <Icon height="24px" Svg={FilledCloseButton} width="24px" />
                  </Button>
                )}
              </Flex>
              <Button
                backgroundColor="none"
                onClick={
                  inputData.length === 0
                    ? handleSearchModalCancelButtonClick
                    : handleSearchModalSearchButtonClick
                }
                padding="0px"
              >
                <Typography color="blueCta" variant="w400-s16">
                  {inputData.length === 0
                    ? enTexts.buttonNames.cancel
                    : enTexts.placeholders.search}
                </Typography>
              </Button>
            </Flex>
            <Typography
              color="greyIconsText"
              marginTop="32px"
              variant="w400-s16"
            >
              {enTexts.claims.searchHistory}
            </Typography>
          </Flex>
        )}
        searchModal
        visible={isSearchModalVisible}
        withoutPadding
      />
      <ScreenWithHeader
        {...(!menuMode && {
          renderCenterComponent: () => (
            <Typography variant="w700-s18">
              {enTexts.buttonNames.explore}
            </Typography>
          )
        })}
        {...(menuMode && {
          renderRightComponent: () => (
            <Flex margin="16px">
              <Icon
                height="24px"
                marginRight="24px"
                onClick={() => {
                  setMenuMode(false);
                }}
                Svg={Search}
                width="24px"
              />
              <Icon height="24px" Svg={Mail} width="24px" />
            </Flex>
          )
        })}
        {...(!menuMode && {
          renderHeaderChildren: () => (
            <>
              <Flex
                alignItems="center"
                backgroundColor="greyLight"
                borderRadius="5px"
                marginLeft="17px"
                marginRight="16px"
                position="relative"
              >
                <Icon
                  color="greyIconsText"
                  height="18px"
                  paddingX="8px"
                  Svg={Search}
                  width="18px"
                />
                <Input
                  onChange={() => {}}
                  onClick={handleOpenSearchModal}
                  paddingY="7px"
                  placeholder="Search"
                  use="search"
                  value={inputData}
                  variant="w400-s16"
                />
                {inputData.length !== 0 && (
                  <Button
                    backgroundColor="none"
                    onClick={clearInput}
                    position="absolute"
                    right="0px"
                  >
                    <Icon height="24px" Svg={FilledCloseButton} width="24px" />
                  </Button>
                )}
              </Flex>
              <XScrolledFlex marginTop="24px">
                <Tabs
                  activeTypographySize="w700-s16"
                  allData={allData}
                  changeContent={changeContentDependOnTabs}
                  marginBetween="30px"
                  tabID={initialTab}
                  tabsProps={tabsLayoutProps}
                  typographySize="w400-s16"
                  width="100%"
                  withoutBorder
                />
              </XScrolledFlex>
            </>
          )
        })}
        renderLeftComponent={
          menuMode
            ? () => (
                <Icon
                  color={theme.colors.orange}
                  height="32px"
                  marginX="17px"
                  Svg={Logo}
                  width="112px"
                />
              )
            : () => (
                <Flex
                  marginX="17px"
                  marginY="16px"
                  onClick={handleBackButtonClick}
                >
                  <BackButton />
                </Flex>
              )
        }
      >
        <Flex
          flexDirection="column"
          marginBottom="55px"
          marginLeft="17px"
          marginRight="16px"
        >
          {menuMode ? (
            <ExploreMenu
              marginTop="24px"
              openDefiniteTab={handleOpenDefiniteTab}
            />
          ) : (
            temporaryContent
          )}
        </Flex>
      </ScreenWithHeader>
    </>
  );
};

export default Explore;
