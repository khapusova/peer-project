import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

export const BackButtonWrapper = styled(Flex)`
  ${() => css`
    transform: rotate(180deg);
  `}
`;
