/* eslint-disable global-require */
import React from 'react';
import { Icon } from '@atoms';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Typography, Image, Flex, Button } from '@mixins';
import { withFlexProps } from '@hocs';
import { ReactComponent as ShareButton } from '@svgs/buttons/share.svg';
import { bool, shape, string } from 'prop-types';
import enTexts from '@translations/en.json';
import { interactWithSubcription } from '../../../store/authorization/duck';

const JournalGeneralInfo = ({ journalInfo }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authorization.userInfo);
  const requestBody = {
    id: user.id,
    token: user.token,
    followingObject: {
      type_of_following: 'journal',
      id: journalInfo.id
    }
  };

  const unfollow = () => {
    dispatch(interactWithSubcription({ ...requestBody, action: 'unfollow' }));
  };
  const follow = () => {
    dispatch(interactWithSubcription({ ...requestBody, action: 'follow' }));
  };

  const handleInteractWithSubcription = () => {
    if (journalInfo.isSubscribed) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <Flex width="100%">
      <Image
        alt={null}
        height="138px"
        src={
          journalInfo.avatarUri ||
          require('@pngs/mockedAvatars/defaultJournalAvatar.png')
        }
        width="104px"
      />
      <Flex flexDirection="column" marginLeft="16px" width="100%">
        <Typography variant="w700-s24">{journalInfo.name}</Typography>
        <Flex marginTop="16px">
          <Button
            onClick={handleInteractWithSubcription}
            variant={journalInfo.isSubscribed ? 'secondary' : 'primary'}
            width="100%"
          >
            <Typography
              paddingBottom="8px"
              paddingTop="10px"
              variant="w700-s16"
            >
              {journalInfo.isSubscribed
                ? enTexts.buttonNames.saved
                : enTexts.buttonNames.save}
            </Typography>
          </Button>
          <Button marginLeft="8px" padding="8px" variant="secondary">
            <Icon height="24px" Svg={ShareButton} width="24px" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

JournalGeneralInfo.propTypes = {
  journalInfo: shape({
    avatarUri: string,
    name: string.isRequired,
    isSubscribed: bool.isRequired
  }).isRequired
};

export default withFlexProps(JournalGeneralInfo);
