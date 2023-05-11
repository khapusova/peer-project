import React from 'react';
import { Flex, Typography, Image, Button } from '@mixins';
import { Icon } from '@atoms';
import { withFlexProps } from '@hocs';
import enTexts from '@translations/en.json';
import { ReactComponent as Institution } from '@svgs/icons/institution.svg';
import { ReactComponent as FollowUser } from '@svgs/buttons/followUser.svg';
import { ReactComponent as FollowedUser } from '@svgs/buttons/followedUser.svg';
import { ReactComponent as DefaultAvatar } from '@svgs/icons/defaultAvatar.svg';
import { bool, string } from 'prop-types';

const AccountYouMayFollow = ({
  userName,
  userSurname,
  institution,
  avatarUri,
  isFollowed,
  withoutBorder,
  blueFollowButton,
  primaryFollowButton
}) => (
  <Flex
    alignItems="center"
    {...(!withoutBorder && {
      borderBottom: '1px solid',
      borderBottomColor: 'greyLine',
      paddingBottom: '14px'
    })}
    justifyContent="space-between"
    width="100%"
  >
    <Flex>
      <Flex marginRight="16px">
        <Flex height="45px" width="45px">
          {avatarUri ? (
            <Image
              alt={null}
              borderRadius="50%"
              height="100%"
              src={avatarUri}
              width="100%"
            />
          ) : (
            <Icon height="45px" Svg={DefaultAvatar} width="45px" />
          )}
        </Flex>
      </Flex>
      <Flex>
        <Flex flexDirection="column">
          <Typography marginY="auto" variant="w400-s18">
            {`${userName} ${userSurname}`}
          </Typography>
          {institution && (
            <Flex alignItems="center">
              <Institution />
              <Typography
                color="greyIconsText"
                marginLeft="10px"
                variant="w400-s14"
              >
                {institution}
              </Typography>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
    {!primaryFollowButton &&
      (isFollowed ? (
        <FollowedUser />
      ) : (
        <Icon
          color={blueFollowButton ? 'blueCta' : 'greyText'}
          height="24px"
          Svg={FollowUser}
          width="24px"
        />
      ))}
    {primaryFollowButton && (
      <Button
        paddingLeft="18px"
        paddingRight="17px"
        paddingY="6px"
        variant="primary"
      >
        <Typography variant="w700-s14">{enTexts.buttonNames.follow}</Typography>
      </Button>
    )}
  </Flex>
);

AccountYouMayFollow.defaultProps = {
  avatarUri: null,
  institution: null,
  blueFollowButton: false,
  primaryFollowButton: false,
  withoutBorder: false
};

AccountYouMayFollow.propTypes = {
  userName: string.isRequired,
  userSurname: string.isRequired,
  institution: string,
  avatarUri: string,
  isFollowed: bool.isRequired,
  blueFollowButton: bool,
  primaryFollowButton: bool,
  withoutBorder: bool
};

export default withFlexProps(AccountYouMayFollow);
