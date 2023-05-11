import React from 'react';
import { withFlexProps } from '@hocs';
import { elementType, string } from 'prop-types';

const Icon = ({ Svg, color, width, height }) => (
  <Svg fill={color} height={height} width={width} />
);

Icon.defaultProps = {
  color: null
};

Icon.propTypes = {
  color: string,
  width: string.isRequired,
  height: string.isRequired,
  Svg: elementType.isRequired
};

export default withFlexProps(Icon);
