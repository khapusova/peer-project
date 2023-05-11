import React from 'react';
import { Flex, Typography } from '@mixins';
import enTexts from '@translations/en.json';

export const dropdownProps = [
  {
    id: 1,
    title: enTexts.claims.aboutLowercase,
    renderChildren: (journal, handleOpenModal) => (
      <Flex flexDirection="column" marginTop="16px">
        <Typography variant="w700-s16">{enTexts.claims.citeScore}</Typography>
        <Flex>
          <Typography color="greyText" variant="w400-s16">
            {journal.citescore.actual}
          </Typography>
          <Typography
            color="blueCta"
            marginLeft="8px"
            onClick={
              Object.keys(journal.citescore.data).length !== 0
                ? handleOpenModal
                : () => {}
            }
            variant="w400-s16"
          >
            {enTexts.claims.viewTrend}
          </Typography>
        </Flex>
      </Flex>
    )
  },
  { title: enTexts.claims.recentArticles, id: 2 },
  { title: enTexts.claims.journalsInSameField, id: 3 }
];
