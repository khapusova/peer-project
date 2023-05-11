import styled, { css } from 'styled-components';

export const BlueText = styled.span`
  ${({ theme: { colors } }) => css`
    color: ${colors.blueCta};
  `}
`;
