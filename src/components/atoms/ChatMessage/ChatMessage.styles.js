import styled, { css } from 'styled-components';
import { Flex } from '@mixins';
import { variant } from 'styled-system';

export const FlexWithVariants = styled(Flex)`
  ${({ theme: { colors } }) => css`
    ${variant({
      variants: {
        outcoming: {
          backgroundColor: colors.blueCta,
          color: colors.white,
          borderRadius: '5px 5px 0px 5px'
        },
        incoming: {
          backgroundColor: colors.greyBackground,
          color: colors.black,
          borderRadius: '5px 5px 5px 0px'
        }
      }
    })};
  `}
`;
