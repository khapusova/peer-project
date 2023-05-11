import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { Flex, Typography } from '@mixins';

export const DownButtonWrapper = styled(Flex)`
  ${({ isRotated }) => css`
    ${variant({
      variants: {
        journal: {
          transform: isRotated ? 'rotate(0deg)' : 'rotate(270deg)'
        },
        dafault: {
          transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)'
        }
      }
    })};
  `}
`;

export const TypographyWithVariants = styled(Typography)`
  ${() => css`
    ${variant({
      prop: 'styleVariant',
      variants: {
        journal: {
          weight: '400',
          fontSize: '16px',
          color: 'black'
        },
        dafault: {
          weight: '400',
          fontSize: '12px',
          color: 'greyIconsText'
        }
      }
    })};
  `}
`;

export const FlexWithVariants = styled(Flex)`
  ${({ theme: { colors } }) => css`
    ${variant({
      variants: {
        journal: {
          borderTop: 'none'
        },
        dafault: {
          borderTop: `1px solid ${colors.greyLine}`
        }
      }
    })};
  `}
`;
