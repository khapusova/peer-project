import React, { useMemo } from 'react';
import { Flex } from '@mixins';
import { OnboardingItem } from '@atoms';
import { withFlexProps } from '@hocs';
import { arrayOf, func, oneOf, shape } from 'prop-types';
import { organizedToRows } from './OnboardingItems.helper';

const OnboardingItems = ({ typeOfItems, setItems, items, pageProps }) => {
  const distributedProps = useMemo(
    () => organizedToRows(2, pageProps),
    [pageProps]
  );

  const memoList = useMemo(
    () =>
      distributedProps.map((propsArr, index) => (
        <Flex key={index} marginBottom="15px" marginLeft="15px">
          {propsArr.map((el) => (
            <OnboardingItem
              key={el.id}
              handleOnClick={() => {
                setItems((prev) => {
                  if (prev.includes(el.title)) {
                    return prev.filter((elem) => elem !== el.title);
                  }
                  return [...prev, el.title];
                });
              }}
              Icon={el.icon}
              isSelected={items.includes(el.title)}
              marginRight="15px"
              title={el.title}
              typeOfItems={typeOfItems}
            />
          ))}
        </Flex>
      )),
    [distributedProps, items]
  );

  return (
    <Flex flexDirection="column" marginTop="15px">
      {memoList.map((el) => el)}
    </Flex>
  );
};

OnboardingItems.propTypes = {
  typeOfItems: oneOf(['area', 'exploring', 'funding', 'journals']).isRequired,
  setItems: func.isRequired,
  items: arrayOf(shape).isRequired,
  pageProps: arrayOf(shape).isRequired
};

export default withFlexProps(OnboardingItems);
