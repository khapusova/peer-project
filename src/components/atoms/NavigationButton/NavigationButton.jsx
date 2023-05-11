import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withFlexProps } from '@hocs';
import { Button, Flex, Typography } from '@mixins';
import { string, PropTypes } from 'prop-types';
import enTexts from '@translations/en.json';

const NavigationButton = ({ IconComponent, title, route }) => {
  const navigate = useNavigate();

  const handleNavigationButtonClick = () => {
    navigate(route);
  };

  return (
    <Flex flexDirection="column">
      <Button
        backgroundColor="none"
        marginBottom="8px"
        onClick={handleNavigationButtonClick}
      >
        {IconComponent}
      </Button>
      <Typography textAlign="center" variant="400w-s14">
        {title}
      </Typography>
      {title === enTexts.buttonNames.peerReviews && (
        <Typography color="greyIconsText" textAlign="center" variant="w300-s12">
          {enTexts.claims.comingSoon}
        </Typography>
      )}
    </Flex>
  );
};

NavigationButton.propTypes = {
  IconComponent: PropTypes.node.isRequired,
  title: string.isRequired,
  route: string.isRequired
};

export default withFlexProps(NavigationButton);
