import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Typography } from '@mixins';
import enTexts from '@translations/en.json';
import { ReactComponent as Cube } from '@svgs/icons/cube.svg';
import { withFlexProps } from '@hocs';
import { ROUTES } from '@constants';
import { arrayOf, number, shape, string } from 'prop-types';

const Journals = ({ journalsList }) => {
  const navigate = useNavigate();

  const memoList = useMemo(
    () =>
      journalsList.map((journal) => (
        <Flex
          key={journal.id}
          borderBottom="1px solid"
          borderBottomColor="greyLine"
          flexDirection="column"
          onClick={() => {
            navigate(`${ROUTES.journals}/${journal.id}`);
          }}
        >
          <Flex
            borderRadius="3px"
            fontFamily="Consolas"
            marginBottom="12px"
            marginTop="16px"
          >
            <Typography
              backgroundColor="lightGreen"
              paddingX="8px"
              paddingY="2px"
              variant="w400-s12"
            >
              {enTexts.claims.journal}
            </Typography>
          </Flex>
          <Typography variant="w400-s18">{journal.name}</Typography>
          <Flex marginTop="8px">
            <Cube />
            <Typography
              color="greyIconsText"
              marginLeft="6px"
              variant="w400-s14"
            >
              {journal.area}
            </Typography>
          </Flex>
          <Flex marginBottom="17px" marginTop="5px">
            <Typography color="greyIconsText" variant="w400-s14">
              {journal.citescore.actual}
            </Typography>
          </Flex>
        </Flex>
      )),
    [journalsList]
  );
  return <>{memoList.map((el) => el)}</>;
};

Journals.propTypes = {
  journalsList: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
      area: string.isRequired,
      year: string.isRequired,
      citescore: shape({
        actual: string.isRequired,
        data: shape()
      }).isRequired
    })
  ).isRequired
};

export default withFlexProps(Journals);
