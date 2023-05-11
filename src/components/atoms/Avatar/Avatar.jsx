import React from 'react';
import { Flex, Typography, Image } from '@mixins';
import { string } from 'prop-types';
import { withFlexProps } from '@hocs';
import { ReactComponent as Institution } from '@svgs/icons/institution.svg';
import { ReactComponent as Location } from '@svgs/icons/location.svg';
import { ReactComponent as DefaultAvatar } from '@svgs/icons/defaultAvatar.svg';

const Avatar = ({ userName, userSurname, country, institution, avatarUri }) => (
  <>
    <Flex marginRight="16px">
      <Flex height="88px" width="88px">
        {avatarUri ? (
          <Image
            alt={null}
            borderRadius="50%"
            height="100%"
            src={avatarUri}
            width="100%"
          />
        ) : (
          <DefaultAvatar />
        )}
      </Flex>
    </Flex>
    <Flex>
      <Flex flexDirection="column">
        <Typography variant="w700-s24">{`${userName} ${userSurname}`}</Typography>
        <Flex alignItems="center">
          <Location />
          <Typography
            color="greyIconsText"
            marginLeft="10px"
            variant="w400-s16"
          >
            {country}
          </Typography>
        </Flex>
        <Flex alignItems="center">
          <Institution />
          <Typography
            color="greyIconsText"
            marginLeft="10px"
            variant="w400-s16"
          >
            {institution}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  </>
);

Avatar.defaultProps = {
  avatarUri: null
};

Avatar.defaultProps = {
  country: '',
  institution: ''
};

Avatar.propTypes = {
  userName: string.isRequired,
  userSurname: string.isRequired,
  country: string,
  institution: string,
  avatarUri: string
};

export default withFlexProps(Avatar);
