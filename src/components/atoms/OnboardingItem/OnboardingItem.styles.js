import { Flex, Typography } from '@mixins';
import { variant } from 'styled-system';
import styled, { css } from 'styled-components';

export const FlexWithVariants = styled(Flex)`
  ${() => css`
    ${variant({
      prop: 'size',
      variants: {
        big: {
          height: '209px',
          width: '164px'
        },
        small: {
          height: '202px',
          width: '160px'
        }
      }
    })};
  `}
`;

export const TypographyWithVariants = styled(Typography)`
  ${({ isSelected }) => css`
    ${variant({
      prop: 'type',
      variants: {
        small: { color: 'black', width: '148px' },
        big: { color: isSelected ? 'blueCta' : 'greyDark', width: '160px' }
      }
    })};
  `}
`;
