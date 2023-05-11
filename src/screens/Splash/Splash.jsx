import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '@svgs/logos/peerefLogo.svg';
import { Flex, Typography } from '@mixins';
import { bool, string } from 'prop-types';
import { Icon } from '@atoms';
import { AnimatedFlex } from './Splash.styles';

const Splash = ({ isSplashVisible, textToDisplay }) => {
  const [isVisible, setIsVisible] = useState(isSplashVisible);

  useEffect(() => {
    if (!isSplashVisible) {
      setTimeout(() => {
        setIsVisible(isSplashVisible);
      }, 2000);
    }
  }, [isSplashVisible]);

  return (
    <AnimatedFlex
      backgroundColor="orange"
      height={window.innerHeight}
      isSplashVisible={isSplashVisible}
      isVisible={isVisible}
      position="fixed"
      width="100%"
    >
      <Flex
        alignItems="center"
        height="100%"
        justifyContent="center"
        width="100%"
      >
        {textToDisplay ? (
          <Typography color="white" variant="w700-s24">
            {textToDisplay}
          </Typography>
        ) : (
          <Icon color="white" height="58px" Svg={Logo} width="280px" />
        )}
      </Flex>
    </AnimatedFlex>
  );
};

Splash.defaultProps = {
  textToDisplay: null
};

Splash.propTypes = {
  isSplashVisible: bool.isRequired,
  textToDisplay: string
};

export default Splash;
