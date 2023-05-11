import React from 'react';
import { Typography, Flex, Button } from '@mixins';

export const tabsLayoutProps = [
  { title: 'Publications', id: 1 },
  { title: 'Journal Comments', id: 2 },
  { title: 'Article Comments', id: 3 }
];

export const dummyPublicationsContent = (
  <Flex display="block">
    <Button backgroundColor="whiteDark" marginBottom="10px">
      <Typography fontFamily="Consolas" variant="w400-s12">
        Published in 2019
      </Typography>
    </Button>
    <Typography variant="w400-s18">
      Genetic manipulation allows in vivo tracking of the life cycle of the
      son-killer symbiont, Arsenophonus nasoniae, and reveals patterns of host
      invasion, tropism and pathology symbiosis Arsenophonus Nasonia
      male-killing
    </Typography>
  </Flex>
);
