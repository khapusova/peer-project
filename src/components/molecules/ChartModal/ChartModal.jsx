/* eslint-disable import/extensions */
import React from 'react';
import { func, shape } from 'prop-types';
import { Flex } from '@mixins';
import { LineChart } from 'react-chartkick';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'chartkick/chart.js';
import { XScrolledFlex, FixedWindow } from './ChartModal.styles';

const ChartModal = ({ renderTitleComponent, data }) => (
  <>
    <FixedWindow
      backgroundColor="black"
      display="block"
      height={`${window.innerHeight}5px`}
      left="50%"
      opacity="50%"
      position="fixed"
      top="50%"
      transform="translate(-50%, -50%)"
      width="105%"
    />
    <FixedWindow
      backgroundColor="white"
      borderRadius="6px"
      display="block"
      left="50%"
      opacity="100%"
      position="fixed"
      top="50%"
      transform="translate(-50%, -50%)"
      width="95%"
    >
      <Flex display="block" padding="24px">
        {renderTitleComponent && renderTitleComponent()}
        <XScrolledFlex margin="16px">
          <Flex width="700px">
            <LineChart color="black" data={data} width="700px" />
          </Flex>
        </XScrolledFlex>
      </Flex>
    </FixedWindow>
  </>
);

ChartModal.defaultProps = {
  renderTitleComponent: null
};

ChartModal.propTypes = {
  data: shape({}).isRequired,
  renderTitleComponent: func
};

export default ChartModal;
