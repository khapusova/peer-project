import styled, { css } from 'styled-components';
import { Typography } from '@mixins';

export const TabTypography = styled(Typography)`
  ${({ theme: { colors }, largeTab, isTabActive, withoutBorder }) => css`
    ${largeTab && { paddingBottom: '11px' }}
    ${isTabActive &&
    !withoutBorder && {
      borderBottom: largeTab
        ? `3px solid ${colors.blueCta}`
        : `2px solid ${colors.blueCta}`
    }}
    color: ${isTabActive ? colors.blueCta : colors.greyIconsText};
  `}
`;
