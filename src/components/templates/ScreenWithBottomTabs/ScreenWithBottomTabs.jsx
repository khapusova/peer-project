import React, { useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Flex, Typography } from '@mixins';
import { Header } from '@molecules';
import { PropTypes } from 'prop-types';
import { ReactComponent as Profile } from '@svgs/icons/profile.svg';
import { ReactComponent as Explore } from '@svgs/icons/explore.svg';
import { ReactComponent as Home } from '@svgs/icons/home.svg';
import enTexts from '@translations/en.json';
import { ROUTES } from '@constants';

const ScreenWithBottomTabs = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === ROUTES.root) {
      navigate(ROUTES.profile);
    }
  });

  return (
    <Flex display="block">
      {children}
      <Outlet />
      <Header
        bottomPosition
        renderCenterComponent={() => (
          <Flex
            as={Link}
            color={pathname === ROUTES.explore ? 'blueCta' : 'greyIconsText'}
            style={{ textDecoration: 'none' }}
            to={ROUTES.explore}
            width="100%"
          >
            <Flex flexDirection="column" justifyContent="center" width="100%">
              <Flex marginX="auto">
                <Explore />
              </Flex>
              <Typography display="flex" marginX="auto" variant="w500-s10">
                {enTexts.buttonNames.explore}
              </Typography>
            </Flex>
          </Flex>
        )}
        renderLeftComponent={() => (
          <Flex
            as={Link}
            color={pathname === ROUTES.home ? 'blueCta' : 'greyIconsText'}
            style={{ textDecoration: 'none' }}
            to={ROUTES.home}
            width="100%"
          >
            <Flex flexDirection="column" justifyContent="center" width="100%">
              <Flex marginX="auto">
                <Home />
              </Flex>
              <Typography display="flex" marginX="auto" variant="w500-s10">
                {enTexts.buttonNames.home}
              </Typography>
            </Flex>
          </Flex>
        )}
        renderRightComponent={() => (
          <Flex
            as={Link}
            color={pathname === ROUTES.profile ? 'blueCta' : 'greyIconsText'}
            style={{ textDecoration: 'none' }}
            to={ROUTES.profile}
            width="100%"
          >
            <Flex flexDirection="column" justifyContent="center" width="100%">
              <Flex marginX="auto">
                <Profile />
              </Flex>
              <Typography display="flex" marginX="auto" variant="w500-s10">
                {enTexts.buttonNames.profile}
              </Typography>
            </Flex>
          </Flex>
        )}
        width="100%"
      />
    </Flex>
  );
};

ScreenWithBottomTabs.defaultProps = {
  children: null
};

ScreenWithBottomTabs.propTypes = {
  children: PropTypes.node
};

export default ScreenWithBottomTabs;
