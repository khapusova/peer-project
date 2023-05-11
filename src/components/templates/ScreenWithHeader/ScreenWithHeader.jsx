import React from 'react';
import { Flex } from '@mixins';
import { Header } from '@molecules';
import { func, PropTypes } from 'prop-types';

const ScreenWithHeader = ({
  renderCenterComponent,
  renderLeftComponent,
  renderRightComponent,
  renderHeaderChildren,
  children
}) => (
  <Flex display="block">
    <Header
      renderCenterComponent={renderCenterComponent}
      renderHeaderChildren={renderHeaderChildren}
      renderLeftComponent={renderLeftComponent}
      renderRightComponent={renderRightComponent}
    />
    {children}
  </Flex>
);

ScreenWithHeader.defaultProps = {
  renderCenterComponent: null,
  renderLeftComponent: null,
  renderRightComponent: null,
  children: null,
  renderHeaderChildren: null
};

ScreenWithHeader.propTypes = {
  renderCenterComponent: func,
  renderLeftComponent: func,
  renderRightComponent: func,
  children: PropTypes.node,
  renderHeaderChildren: func
};

export default ScreenWithHeader;
