import styled, { css } from 'styled-components';
import {
  color,
  layout,
  border,
  space,
  variant,
  position,
  typography
} from 'styled-system';

const getColor = (focused, invalid, colors) => {
  if (focused) {
    return colors.blueCta;
  }
  if (invalid) {
    return colors.red;
  }
  return colors.grey;
};

const Input = styled.input`
  ${({ theme: { colors, sizes }, focused, invalid }) => css`
    ${border}
    ${layout}
    ${space}
    ${color}
    ${position}
    ${typography}

    ${variant({
      prop: 'use',
      variants: {
        search: {
          backgroundColor: colors.greyLight,
          borderRadius: sizes.radius.medium,
          border: 'none'
        },
        assignment: {
          border: 'none',
          borderBottom: `1px solid ${getColor(focused, invalid, colors)}`
        }
      }
    })};

    ${variant({
      variants: {
        'w400-s12': {
          fontWeight: '400',
          fontSize: '12px'
        },
        'w400-s14': {
          fontWeight: '400',
          fontSize: '14px'
        },
        'w700-s14': {
          fontWeight: '700',
          fontSize: '14px'
        },
        'w700-s16': {
          fontWeight: '700',
          fontSize: '16px'
        },
        'w400-s16': {
          fontWeight: '400',
          fontSize: '16px'
        },
        'w500-s17': {
          fontWeight: '500',
          fontSize: '17px'
        },
        'w400-s17': {
          fontWeight: '400',
          fontSize: '17px'
        },
        'w700-s24': {
          fontWeight: '700',
          fontSize: '24px'
        }
      }
    })}
  `}
`;

export default Input;
