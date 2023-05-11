import React, { useMemo } from 'react';
import { Flex, Typography } from '@mixins';
import enTexts from '@translations/en.json';
import { AccountYouMayFollow } from '@molecules';
import { theme } from '@styles';
import { ReactComponent as Book } from '@svgs/icons/book.svg';
import { withFlexProps } from '@hocs';
import { arrayOf, number, shape, string } from 'prop-types';

const Researchers = ({ researchersList }) => {
  const memoList = useMemo(
    () =>
      researchersList.map((researcher) => (
        <Flex
          key={researcher.id}
          borderBottom="1px solid"
          borderBottomColor="greyLine"
          flexDirection="column"
        >
          <Flex fontFamily="Consolas" marginBottom="12px" marginTop="16px">
            <Typography
              background={theme.colors.linearYellowRed}
              borderRadius="3px"
              color="white"
              paddingX="8px"
              paddingY="2px"
              variant="w400-s12"
            >
              {researcher.type}
            </Typography>
          </Flex>
          <AccountYouMayFollow
            isFollowed={false}
            marginBottom="8px"
            primaryFollowButton
            userName={researcher.name.split(' ')[0]}
            userSurname={researcher.name.split(' ')[1]}
            withoutBorder
          />
          <Typography variant="w400-s14">
            {enTexts.claims.affiliation}
          </Typography>
          <Typography color="greyIconsText" marginTop="4px" variant="w400-s14">
            {researcher.affiliation}
          </Typography>
          <Typography marginTop="10px" variant="w400-s14">
            {enTexts.claims.selectedPublication}
          </Typography>
          <Typography color="blueCta" marginTop="4px" variant="w400-s14">
            {researcher.selected_publication}
          </Typography>
          <Flex marginBottom="11px" marginTop="6px">
            <Book />
            <Typography
              color="greyIconsText"
              marginLeft="6px"
              variant="w400-s14"
            >
              {researcher.journal}
            </Typography>
          </Flex>
          <Typography variant="w400-s14">{enTexts.claims.topics}</Typography>
          <Flex marginBottom="16px">
            {researcher.topics.map((topic) => (
              <Flex key={topic} marginRight="8px">
                <Typography
                  backgroundColor="blueTag"
                  fontFamily="Consolas"
                  padding="8px"
                  paddingBottom="2px"
                  paddingTop="4px"
                  variant="w400-s12"
                >
                  {topic}
                </Typography>
              </Flex>
            ))}
          </Flex>
        </Flex>
      )),
    [researchersList]
  );
  return <>{memoList.map((el) => el)}</>;
};

Researchers.propTypes = {
  researchersList: arrayOf(
    shape({
      id: number.isRequired,
      type: string,
      avatarUri: string,
      affiliation: string.isRequired,
      selected_publication: string.isRequired,
      journal: string,
      topics: arrayOf(string),
      name: string.isRequired
    })
  ).isRequired
};

export default withFlexProps(Researchers);
