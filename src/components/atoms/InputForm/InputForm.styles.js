import { Typography, Input } from '@mixins';
import styled, { css } from 'styled-components';

export const Label = styled(Typography)`
  ${({ focused, isEmpty, withPlaceholder }) => css`
    transition: 0.5s;
    ${!withPlaceholder && `top: ${focused || !isEmpty ? '-17px' : '0px'};`}
    ${withPlaceholder && 'top: -22px;'}
  `}
`;

export const InputMultiline = styled(Input)`
  ${({ theme: { colors }, withPlaceholder, isEmpty }) => css`
    resize: none;
    &::placeholder {
      ${withPlaceholder && isEmpty && `color: ${colors.greyLightPlaceholder};`}
    }
  `}
`;
