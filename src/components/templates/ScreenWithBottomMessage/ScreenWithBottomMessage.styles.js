import styled, { css } from 'styled-components';
import { Flex } from '@mixins';

const FixedFlex = styled(Flex)`
  ${() => css`
    z-index: 1;
  `}
`;

export default FixedFlex;
