import { Flex } from '@mixins';
import styled, { css } from 'styled-components';

export const XScrolledFlex = styled(Flex)`
  ${() => css`
    overflow-x: auto;
  `}
`;

export const FixedWindow = styled(Flex)`
  ${() => css`
    transform: translate(-50%, -50%);
    z-index: 1;
  `}
`;
