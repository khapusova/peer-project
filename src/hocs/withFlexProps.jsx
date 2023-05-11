import React from 'react';
import { Flex } from '@mixins';

const withFlexProps = (ChildComponent) => (props) =>
  (
    <Flex {...props}>
      <ChildComponent {...props} />
    </Flex>
  );

export default withFlexProps;
