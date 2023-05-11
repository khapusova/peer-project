import styled, { css } from 'styled-components';
import {
  variant,
  layout,
  border,
  space,
  position,
  color,
  typography
} from 'styled-system';

const Button = styled.button`
  ${({ theme: { colors, sizes }, disabled }) => css`
    border: none;
    border-radius: ${sizes.radius.standart};
    cursor: pointer;

    ${position}
    ${typography}
    ${border}
    ${layout}
    ${space}
    ${color}

    ${variant({
      variants: {
        primary: {
          border: colors.none,
          backgroundColor: disabled ? colors.blueLight : colors.blueCta,
          color: colors.white
        },
        secondary: {
          border: `1px solid ${colors.grey}`,
          backgroundColor: colors.none,
          color: disabled ? colors.grey : colors.black
        }
      }
    })}
  `}
`;

export default Button;
