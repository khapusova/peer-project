import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

const getLeftPosition = (inversedAnimationState, visible) => {
  if (visible) {
    return '50%';
  }
  if (inversedAnimationState) {
    return '150%';
  }
  return '-50%';
};

const FixedWindow = styled(Flex)`
  ${({
    visible,
    visibleWithAnimation,
    backgroundFlex,
    inversedAnimationState,
    slideAnimation
  }) => css`
    top: 50%;
    ${slideAnimation &&
    `left: ${getLeftPosition(inversedAnimationState, visible)};`}
    ${!slideAnimation && 'left: 50%;'}
    transform: translate(-50%, -50%);
    z-index: 2;
    transition: all 0.75s;
    -wekit-transition: all 0.75s;
    -moz-transition: all 0.75s;
    display: ${visibleWithAnimation ? 'block' : 'none'};
    ${backgroundFlex && `opacity: ${visible ? '50%' : '0%'}`};
    ${!backgroundFlex &&
    !slideAnimation &&
    `opacity: ${visible ? '100%' : '0%'}`};
  `}
`;

export default FixedWindow;
