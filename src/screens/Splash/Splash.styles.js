import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

export const AnimatedFlex = styled(Flex)`
  ${({ isSplashVisible, isVisible }) => css`
    z-index: 2;
    transition: all 0.75s;
    opacity: ${isSplashVisible ? '1' : '0'};
    display: ${!isVisible ? ' none' : 'block'};
    -wekit-transition: all 0.75s;
    -moz-transition: all 0.75s;
  `}
`;
