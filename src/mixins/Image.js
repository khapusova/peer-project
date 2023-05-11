import styled, { css } from 'styled-components';
import { border, layout, space, position } from 'styled-system';

const Image = styled.img`
  ${() => css`
    ${border}
    ${layout}
    ${space}
    ${position}
  `}
`;

export default Image;
