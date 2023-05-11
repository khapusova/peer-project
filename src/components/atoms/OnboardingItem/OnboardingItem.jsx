import React from 'react';
import { Flex } from '@mixins';
import { string, PropTypes, bool, func, oneOf } from 'prop-types';
import { ITEM_TITLE_SIMBOLS } from '@constants';
import { withFlexProps } from '@hocs';
import {
  FlexWithVariants,
  TypographyWithVariants
} from './OnboardingItem.styles';

const OnboardingItem = ({
  Icon,
  title,
  isSelected,
  handleOnClick,
  typeOfItems
}) => {
  const exploringOrArea = typeOfItems === 'area' || typeOfItems === 'exploring';
  const isNeedToBeShorten = title.length > ITEM_TITLE_SIMBOLS;

  const shortenText = isNeedToBeShorten
    ? `${title.slice(0, ITEM_TITLE_SIMBOLS)}...`
    : title;

  return (
    <FlexWithVariants
      backgroundColor={isSelected ? 'whiteDark' : 'white'}
      border="1px solid"
      borderColor="greyLine"
      onClick={handleOnClick}
      size={exploringOrArea ? 'small' : 'big'}
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        marginY={exploringOrArea ? 'auto' : '15px'}
      >
        <Flex color={isSelected ? 'blueCta' : 'grey'} marginX="38px">
          {Icon}
        </Flex>
        <Flex margin="auto">
          <TypographyWithVariants
            alighItems="center"
            isSelected={isSelected}
            textAlign="center"
            type={exploringOrArea ? 'big' : 'small'}
            variant="w400-s16"
          >
            {shortenText}
          </TypographyWithVariants>
        </Flex>
      </Flex>
    </FlexWithVariants>
  );
};

OnboardingItem.propTypes = {
  title: string.isRequired,
  Icon: PropTypes.node.isRequired,
  isSelected: bool.isRequired,
  handleOnClick: func.isRequired,
  typeOfItems: oneOf(['area', 'exploring', 'funding', 'journals']).isRequired
};

export default withFlexProps(OnboardingItem);
