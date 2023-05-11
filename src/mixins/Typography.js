import styled, { css } from 'styled-components';
import {
  variant,
  layout,
  border,
  space,
  color,
  position,
  background,
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

const Typography = styled.p`
  ${({ theme: { colors }, focused, invalid }) => css`
    ${border}
    ${background}
    ${layout}
    ${space}
    ${color}
    ${position}
    ${typography}

    ${variant({
      prop: 'use',
      variants: {
        labelToInput: { color: getColor(focused, invalid, colors) },
        error: { color: colors.red }
      }
    })}

    ${variant({
      variants: {
        'w500-s10': {
          fontWeight: '500',
          fontSize: '10px'
        },
        'w300-s12': {
          fontWeight: '300',
          fontSize: '12px'
        },
        'w400-s12': {
          fontWeight: '400',
          fontSize: '12px'
        },
        'w700-s12': {
          fontWeight: '700',
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
        'w700-s17': {
          fontWeight: '700',
          fontSize: '17px'
        },
        'w400-s18': {
          fontWeight: '400',
          fontSize: '18px'
        },
        'w700-s18': {
          fontWeight: '700',
          fontSize: '18px'
        },
        'w700-s24': {
          fontWeight: '700',
          fontSize: '24px'
        }
      }
    })}
  `}
`;

export default Typography;
