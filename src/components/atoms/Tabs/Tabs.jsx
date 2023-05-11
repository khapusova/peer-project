import React, { useMemo, useState, useEffect } from 'react';
import { Flex, Button } from '@mixins';
import { withFlexProps } from '@hocs';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { TabTypography } from './Tabs.styles';

const Tabs = ({
  tabsProps,
  changeContent,
  typographySize,
  activeTypographySize,
  withoutBorder,
  marginBetween,
  allData,
  tabID,
  withoutText
}) => {
  const [activeTabId, setActiveTabId] = useState(tabID || tabsProps[0]?.id);

  const handleTabClick = (tabProps) => () => {
    setActiveTabId(tabProps.id);
    changeContent(tabProps.id);
  };
  useEffect(() => {
    changeContent(activeTabId);
  }, [allData]);

  useEffect(() => {
    if (tabID) {
      setActiveTabId(tabID);
    }
  }, [tabID]);

  const memoTabs = useMemo(
    () =>
      tabsProps.map((tabProps) => (
        <Flex
          key={tabProps.id}
          marginX="-2px"
          {...(marginBetween && { marginLeft: marginBetween })}
          {...(typographySize !== 'w400-s14' && { width: '100%' })}
        >
          <Button
            backgroundColor="none"
            onClick={handleTabClick(tabProps)}
            width="100%"
          >
            {withoutText ? (
              <Flex
                backgroundColor="orange"
                borderRadius="20px"
                height="6px"
                width={activeTabId === tabProps.id ? '36px' : '6px'}
              />
            ) : (
              <TabTypography
                isTabActive={activeTabId === tabProps.id}
                largeTab={typographySize !== 'w400-s14'}
                variant={
                  activeTabId === tabProps.id
                    ? activeTypographySize
                    : typographySize
                }
                withoutBorder={withoutBorder}
              >
                {tabProps.title}
              </TabTypography>
            )}
          </Button>
        </Flex>
      )),
    [tabsProps, activeTabId]
  );

  return <>{memoTabs.map((el) => el)}</>;
};
Tabs.defaultProps = {
  typographySize: 'w400-s14',
  activeTypographySize: 'w700-s14',
  withoutBorder: false,
  marginBetween: null,
  allData: null,
  tabID: null,
  withoutText: false
};

Tabs.propTypes = {
  tabsProps: arrayOf(
    shape({
      title: string.isRequired,
      id: number.isRequired
    })
  ).isRequired,
  changeContent: func.isRequired,
  activeTypographySize: string,
  typographySize: string,
  withoutBorder: bool,
  marginBetween: string,
  allData: shape(),
  tabID: number,
  withoutText: bool
};

export default withFlexProps(Tabs);
