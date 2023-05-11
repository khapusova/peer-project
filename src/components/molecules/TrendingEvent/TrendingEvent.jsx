import React from 'react';
import { Typography, Flex, Image } from '@mixins';
import { Icon } from '@atoms';
import { shape, string } from 'prop-types';
import { ReactComponent as DefaultAvatar } from '@svgs/icons/defaultAvatar.svg';
import { withFlexProps } from '@hocs';
import { BoldText } from './TrendingEvent.styles';
import { getClaim } from './TrendingEvents.helper';

const TrendingEvent = ({ eventInfo }) => (
  <Flex
    borderBottom="1px solid"
    borderBottomColor="greyLine"
    flexDirection="column"
  >
    <Flex>
      <Flex height="45px" marginRight="12px" width="45px">
        {eventInfo.avatarUri ? (
          <Image
            alt={null}
            borderRadius="50%"
            height="100%"
            src={eventInfo.avatarUri}
            width="100%"
          />
        ) : (
          <Icon height="45px" Svg={DefaultAvatar} width="45px" />
        )}
      </Flex>
      <Typography variant="w400-s16">
        <BoldText>{`${eventInfo.userName} ${eventInfo.userSurname} `}</BoldText>
        {getClaim(eventInfo.flag)}
        <BoldText>{` ${eventInfo.interactionObject}`}</BoldText>
        {(eventInfo.flag === 'comment_hub' ||
          eventInfo.flag === 'comment_journal') &&
          ':'}
      </Typography>
    </Flex>
    {(eventInfo.flag === 'comment_hub' ||
      eventInfo.flag === 'comment_journal') && (
      <Typography color="greyText" marginTop="6px" variant="w400-s16">
        {eventInfo.commentContent}
      </Typography>
    )}
    <Typography
      color="greyIconsText"
      marginBottom="12px"
      marginTop="4px"
      variant="w300-s12"
    >
      {eventInfo.dateOfPublication}
    </Typography>
  </Flex>
);

TrendingEvent.propTypes = {
  eventInfo: shape({
    avatarUri: string,
    dateOfPublication: string.isRequired,
    commentContent: string,
    userName: string.isRequired,
    userSurname: string.isRequired,
    flag: string.isRequired
  }).isRequired
};

export default withFlexProps(TrendingEvent);
