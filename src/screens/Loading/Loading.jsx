/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { Flex } from '@mixins';
import { bool } from 'prop-types';
import { AnimatedFlex } from './Loading.styles';

const Loading = ({ isLoadingVisible }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoadingVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } else {
      setIsVisible(true);
    }
  }, [isLoadingVisible]);

  return (
    <AnimatedFlex
      backgroundColor="white"
      height={window.innerHeight}
      isLoadingVisible={isLoadingVisible}
      isVisible={isVisible}
      position="fixed"
      transform="translate(-50%, -50%)"
      width="100%"
    >
      <Flex
        alignItems="center"
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <img alt="loading" src={require('@gifs/loader.gif')} />
      </Flex>
    </AnimatedFlex>
  );
};

Loading.propTypes = {
  isLoadingVisible: bool.isRequired
};

export default Loading;
