import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

export const FixedWindow = styled(Flex)`
  ${({ clicked }) => css`
    transform: translate(-50%, -50%);
    z-index: 1;
    overflow-y: scroll;
    top: ${clicked ? '53.1%' : '150%'};
    transition: 1s;
  `}
`;

export const BackButtonWrapper = styled(Flex)`
  ${() => css`
    transform: rotate(180deg);
  `}
`;
