import styled, { css } from 'styled-components';
import { color, layout, border, space, position } from 'styled-system';

import { Input } from '@mixins';

export const RadioInput = styled(Input)`
  ${({ theme: { colors, sizes } }) => css`
    display: none;

    + label:before {
      content: '';
      padding-left: ${sizes.spaces.small[0]};
      padding-right: ${sizes.spaces.small[1]};
      border-radius: ${sizes.radius.large};
      color: ${colors.none};
      border: ${sizes.border.standart} solid ${colors.greyDark};
    }

    &:checked + label:before {
      background-color: ${colors.blueCta};
      border-color: ${colors.blueCta};
      color: ${colors.white};
    }

    ${border}
    ${layout}
    ${space}
    ${color}
    ${position}
  `}
`;
