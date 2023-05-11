import React from 'react';
import { Flex } from '@mixins';
import { bool, func } from 'prop-types';
import { withFlexProps } from '@hocs';

const Header = ({
  renderLeftComponent,
  renderRightComponent,
  renderCenterComponent,
  bottomPosition,
  renderHeaderChildren
}) => (
  <Flex
    {...(!bottomPosition && {
      top: '0px',
      borderBottom: '1px solid',
      borderBottomColor: 'grey'
    })}
    {...(bottomPosition && {
      bottom: '0px',
      borderTop: '1px solid',
      borderTopColor: 'grey',
      position: 'fixed',
      paddingY: '7px'
    })}
    backgroundColor="whiteDark"
    display="block"
    width="100%"
  >
    <Flex justifyContent="space-between">
      <Flex alignItems="center" justifyContent="start" width="100%">
        {renderLeftComponent && renderLeftComponent()}
      </Flex>
      <Flex alignItems="center" justifyContent="center" width="100%">
        {renderCenterComponent && renderCenterComponent()}
      </Flex>
      <Flex alignItems="center" justifyContent="end" width="100%">
        {renderRightComponent && renderRightComponent()}
      </Flex>
    </Flex>
    {renderHeaderChildren && renderHeaderChildren()}
  </Flex>
);

Header.defaultProps = {
  renderCenterComponent: null,
  renderLeftComponent: null,
  renderRightComponent: null,
  renderHeaderChildren: null,
  bottomPosition: false
};

Header.propTypes = {
  renderCenterComponent: func,
  renderLeftComponent: func,
  renderRightComponent: func,
  renderHeaderChildren: func,
  bottomPosition: bool
};

export default withFlexProps(Header);
