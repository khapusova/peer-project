import React, { useState } from 'react';
import { Button } from '@mixins';
import { withFlexProps } from '@hocs';
import { theme } from '@styles';
import { func, string } from 'prop-types';
import { ReactComponent as DownButtonIcon } from '@svgs/buttons/down.svg';
import {
  DownButtonWrapper,
  TypographyWithVariants,
  FlexWithVariants
} from './DropdownMenu.styles';

const DropdownMenu = ({ title, renderChildren, styleVariant }) => {
  const [isDropdownToggled, setIsDropdownToggled] = useState(false);

  const handleDropdownButtonClick = () => {
    setIsDropdownToggled((prev) => !prev);
  };

  return (
    <FlexWithVariants
      borderBottom={`1px solid ${theme.colors.greyLine}`}
      display="block"
      paddingY="14px"
      variant={styleVariant}
      width="100%"
    >
      <Button
        backgroundColor="none"
        display="flex"
        onClick={handleDropdownButtonClick}
      >
        <TypographyWithVariants marginY="auto" styleVariant={styleVariant}>
          {title}
        </TypographyWithVariants>

        <DownButtonWrapper
          isRotated={isDropdownToggled}
          marginLeft="11px"
          variant={styleVariant}
        >
          <DownButtonIcon />
        </DownButtonWrapper>
      </Button>
      {isDropdownToggled && renderChildren && renderChildren()}
    </FlexWithVariants>
  );
};

DropdownMenu.defaultProps = {
  renderChildren: null,
  styleVariant: 'default'
};

DropdownMenu.propTypes = {
  title: string.isRequired,
  renderChildren: func,
  styleVariant: string
};

export default withFlexProps(DropdownMenu);
