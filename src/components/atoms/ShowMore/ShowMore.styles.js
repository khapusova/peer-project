import styled, { css } from 'styled-components';

export const BlueText = styled.span`
  ${({ theme: { colors } }) => css`
    color: ${colors.blueCta};
  `}
`;

export const GreyText = styled.span`
  ${({ theme: { colors } }) => css`
    color: ${colors.greyText};
  `}
`;
