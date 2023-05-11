import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

export const AnimatedFlex = styled(Flex)`
  ${({ isLoadingVisible, isVisible }) => css`
    z-index: 2;
    transition: all 2s;
    opacity: ${isLoadingVisible ? '1' : '0'};
    display: ${!isVisible ? ' none' : 'block'};
    -wekit-transition: all 2s;
    -moz-transition: all 2s;
  `}
`;
