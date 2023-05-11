import React, { useState } from 'react';
import { Tabs } from '@atoms';
import { withFlexProps } from '@hocs';
import {
  tabsLayoutProps,
  dummyPublicationsContent
} from './UserProfileTabs.helper';

const UserProfileTabs = () => {
  const [temporaryContent, setTemporaryContent] = useState(
    dummyPublicationsContent
  );

  const changeContent = (id) => {
    if (id === 1) {
      setTemporaryContent(dummyPublicationsContent);
    }
    if (id === 2) {
      setTemporaryContent();
    }
    if (id === 3) {
      setTemporaryContent();
    }
  };

  return (
    <>
      <Tabs
        changeContent={changeContent}
        justifyContent="space-between"
        marginY="24px"
        tabsProps={tabsLayoutProps}
      />
      {temporaryContent}
    </>
  );
};

export default withFlexProps(UserProfileTabs);
