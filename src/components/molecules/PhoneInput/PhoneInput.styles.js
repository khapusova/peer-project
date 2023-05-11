import { Typography, Input } from '@mixins';
import styled, { css } from 'styled-components';

export const Label = styled(Typography)`
  ${({ focused, isEmpty, withPlaceholder, isPhoneCodeSet }) => css`
    transition: 0.5s;
    ${!withPlaceholder && `top: ${focused || !isEmpty ? '-22px' : '0px'};`}
    ${withPlaceholder && 'top: -22px;'}
    ${isPhoneCodeSet && 'left: -50px;'}
  `}
`;

export const InputMultiline = styled(Input)`
  ${({ theme: { colors } }) => css`
    resize: none;
    &::placeholder {
      color: ${colors.greyLightPlaceholder};
    }
  `}
`;
