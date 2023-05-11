import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

export const XScrolledFlex = styled(Flex)`
  ${() => css`
    overflow-x: auto;
  `}
`;
