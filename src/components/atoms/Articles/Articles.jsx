import React, { useMemo } from 'react';
import { Flex, Typography } from '@mixins';
import enTexts from '@translations/en.json';
import { ReactComponent as Book } from '@svgs/icons/book.svg';
import { ReactComponent as Calendar } from '@svgs/icons/calendar.svg';
import { withFlexProps } from '@hocs';
import { arrayOf, number, shape, string } from 'prop-types';

const Articles = ({ articlesList }) => {
  const memoList = useMemo(
    () =>
      articlesList.map((article) => (
        <Flex
          key={article.id}
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
              backgroundColor="lightYellow"
              paddingX="8px"
              paddingY="2px"
              variant="w400-s12"
            >
              {enTexts.claims.article}
            </Typography>
          </Flex>
          <Typography variant="w400-s18">{article.name}</Typography>
          <Flex marginTop="8px">
            <Book />
            <Typography color="blueCta" marginLeft="6px" variant="w400-s14">
              {article.area}
            </Typography>
          </Flex>
          <Flex marginBottom="17px" marginTop="5px">
            <Calendar />
            <Typography
              color="greyIconsText"
              marginLeft="6px"
              variant="w400-s14"
            >
              {article.year}
            </Typography>
          </Flex>
        </Flex>
      )),
    [articlesList]
  );
  return <>{memoList.map((el) => el)}</>;
};

Articles.propTypes = {
  articlesList: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
      area: string.isRequired,
      citescore: shape(),
      year: string.isRequired
    })
  ).isRequired
};

export default withFlexProps(Articles);
