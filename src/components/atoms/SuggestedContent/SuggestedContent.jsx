/* eslint-disable prettier/prettier */
import React, { useMemo } from 'react';
import { Typography, Flex, Button } from '@mixins';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import enTexts from '@translations/en.json';
import { withFlexProps } from '@hocs';
import { ReactComponent as Followers } from '@svgs/icons/followers.svg';
import { ReactComponent as Comments } from '@svgs/icons/comments.svg';
import { ReactComponent as Locked } from '@svgs/icons/locked.svg';
import { BlueText } from './SuggestedContent.styles';
import { organizedToRows } from './SuggestedContent.helper';

const SuggestedContent = ({ eventInfo, inModal }) => {
  const tagMemoList = useMemo(
    () =>
      eventInfo.areas.map((area) => (
        <Flex key={area} marginRight="8px">
          <Typography
            backgroundColor="blueTag"
            fontFamily="Consolas"
            padding="8px"
            paddingBottom="2px"
            paddingTop="4px"
            variant="w400-s12"
          >
            {area}
          </Typography>
        </Flex>
      )),
    [eventInfo.areas]
  );

  return (
    <Flex flexDirection="column" width="100%">
      <Flex justifyContent="space-between" marginBottom="12px">
        <Flex>
          {eventInfo.privacy === 'closed' && <Locked />}
          <Typography
            {...(eventInfo.privacy === 'closed' && { marginLeft: '8px' })}
            fontFamily="Consolas"
            variant="w400-s12"
          >
            {`${enTexts.claims.createdBy} `}
            <BlueText>{eventInfo.created_by}</BlueText>
          </Typography>
        </Flex>
        <Flex>
          <Flex>
            <Comments />
            <Typography color="greyText" marginLeft="6px" variant="w400-s14">
              {eventInfo.comments_count}
            </Typography>
          </Flex>
          <Flex marginLeft="12px">
            <Followers />
            <Typography color="greyText" marginLeft="6px" variant="w400-s14">
              {eventInfo.followers_count}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Typography variant="w400-s18">
          {` ${eventInfo.interactionObject}`}
        </Typography>
      </Flex>
      <Flex
        display={inModal ? 'block' : 'flex'}
        marginBottom="8px"
        marginTop="10px"
        width="100%"
      >
        {inModal
          ? organizedToRows(2, tagMemoList).map((elem, index) => (
            <Flex
              justifyContent="center"
              {...(index !== organizedToRows(2, tagMemoList).length && {
                  marginBottom: '25px'
                })}
            >
              {elem.map((el) => el)}
            </Flex>
            ))
          : tagMemoList.map((el) => el)}
      </Flex>
      <Flex flexDirection="row-reverse">
        <Button
          backgroundColor="none"
          border="1px solid"
          borderColor="blueCta"
          paddingBottom="9.5px"
          paddingTop="9.5px"
          paddingX="16px"
        >
          <Typography
            color="blueCta"
            display="flex"
            margin="0px"
            variant="w700-s16"
          >
            {enTexts.buttonNames.joinHubs}
          </Typography>
        </Button>
      </Flex>
    </Flex>
  );
};

SuggestedContent.defaultProps = {
  inModal: false
};

SuggestedContent.propTypes = {
  eventInfo: shape({
    areas: arrayOf(string).isRequired,
    interactionObject: string.isRequired,
    followers_count: number.isRequired,
    comments_count: number.isRequired,
    created_by: string.isRequired,
    privacy: string.isRequired
  }).isRequired,
  inModal: bool
};

export default withFlexProps(SuggestedContent);
