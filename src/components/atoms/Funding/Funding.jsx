import React, { useMemo } from 'react';
import { Flex, Typography } from '@mixins';
import enTexts from '@translations/en.json';
import { ReactComponent as Cube } from '@svgs/icons/cube.svg';
import { ReactComponent as Timer } from '@svgs/icons/timer.svg';
import { withFlexProps } from '@hocs';
import { arrayOf, number, shape, string } from 'prop-types';

const Funding = ({ fundingList }) => {
  const memoList = useMemo(
    () =>
      fundingList.map((fundingEl) => (
        <Flex
          key={fundingEl.id}
          borderBottom="1px solid"
          borderBottomColor="greyLine"
          flexDirection="column"
        >
          <Flex
            borderRadius="3px"
            fontFamily="Consolas"
            marginBottom="12px"
            marginTop="16px"
          >
            <Typography
              backgroundColor="lightPink"
              paddingX="8px"
              paddingY="2px"
              variant="w400-s12"
            >
              {enTexts.claims.funding}
            </Typography>
          </Flex>
          <Typography variant="w400-s18">{fundingEl.name}</Typography>
          <Flex marginTop="8px">
            <Cube />
            <Typography
              color="greyIconsText"
              marginLeft="6px"
              variant="w400-s14"
            >
              {fundingEl.area}
            </Typography>
          </Flex>
          <Flex marginBottom="17px" marginTop="5px">
            <Timer />
            <Typography
              color="greyIconsText"
              marginLeft="6px"
              variant="w400-s14"
            >
              {fundingEl.year}
            </Typography>
          </Flex>
        </Flex>
      )),
    [fundingList]
  );
  return <>{memoList.map((el) => el)}</>;
};

Funding.propTypes = {
  fundingList: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
      area: string.isRequired,
      year: string.isRequired
    })
  ).isRequired
};

export default withFlexProps(Funding);
