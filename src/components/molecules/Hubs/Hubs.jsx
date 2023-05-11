import React, { useMemo } from 'react';
import { withFlexProps } from '@hocs';
import { SuggestedContent } from '@atoms';
import { arrayOf, number, shape, string } from 'prop-types';

const Hubs = ({ hubsList }) => {
  const memoList = useMemo(
    () =>
      hubsList.map((hub) => (
        <SuggestedContent key={hub.id} eventInfo={hub} marginY="24px" />
      )),
    [hubsList]
  );
  return <>{memoList.map((el) => el)}</>;
};

Hubs.propTypes = {
  hubsList: arrayOf(
    shape({
      areas: arrayOf(string).isRequired,
      interactionObject: string.isRequired,
      followers_count: number.isRequired,
      comments_count: number.isRequired,
      created_by: string.isRequired,
      privacy: string.isRequired
    })
  ).isRequired
};

export default withFlexProps(Hubs);
