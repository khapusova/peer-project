import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

const FixedWindow = styled(Flex)`
  ${() => css`
    position: fixed;
    z-index: 2;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

export default FixedWindow;
