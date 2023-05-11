import React, { useMemo } from 'react';
import { Flex, Typography } from '@mixins';
import { ShowMore } from '@atoms';
import { withFlexProps } from '@hocs';
import enTexts from '@translations/en.json';
import { shape, string } from 'prop-types';
import { getShowMoreLayoutProps } from './About.helper';

const About = ({ fullUserInfo }) => {
  const memoShowMoreList = useMemo(() =>
    getShowMoreLayoutProps(fullUserInfo).map((componentProps, index) => (
      <ShowMore
        key={componentProps.id}
        fullText={componentProps.content}
        title={componentProps.title}
        {...(getShowMoreLayoutProps(fullUserInfo).length !== index + 1 && {
          marginBottom: '8px'
        })}
      />
    ))
  );

  return (
    <>
      <Typography color="greyIconsText" variant="w400-s12">
        {enTexts.claims.about}
      </Typography>
      <Flex display="block" marginBottom="16px" marginTop="8px">
        {memoShowMoreList.map((comp) => comp)}
      </Flex>
    </>
  );
};

About.propTypes = {
  fullUserInfo: shape({
    bio: string.isRequired,
    position: string.isRequired,
    areasOfInterest: string.isRequired
  }).isRequired
};

export default withFlexProps(About);
