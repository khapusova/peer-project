import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

export const AnimatedFlex = styled(Flex)`
  ${({ visible, visibleWithAnimation }) => css`
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: all 0.75s;
    -wekit-transition: all 0.75s;
    -moz-transition: all 0.75s;
    display: ${visibleWithAnimation ? 'block' : 'none'};
    opacity: ${visible ? '100%' : '0%'};
  `}
`;
