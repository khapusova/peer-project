import React, { useMemo, useState, useEffect } from 'react';
import { TextInputWithDeleteButton } from '@atoms';
import { Button, Typography, Flex } from '@mixins';
import { withFlexProps } from '@hocs';
import enTexts from '@translations/en.json';
import { arrayOf, func, string } from 'prop-types';

const AreaOfInterestInputs = ({ getActualData, initialData }) => {
  const [areas, setAreas] = useState(
    initialData?.map((el, index) => ({ id: index, value: el })) || [
      { value: '', id: 1 }
    ]
  );

  useEffect(() => {
    getActualData(areas.map((area) => area.value));
  }, [areas]);

  const addArea = () => {
    const isAnyEmptyInput = areas.map((el) => el.value.length).includes(0);
    if (!isAnyEmptyInput) {
      const ids = areas.map((area) => area.id);
      const id = ids.length === 0 ? 1 : Math.max.apply(null, ids) + 1;
      setAreas((prev) => [...prev, { value: '', id }]);
    }
  };

  const deleteArea = (id) => {
    setAreas((prev) => prev.filter((el) => el.id !== id));
  };

  const memoList = useMemo(
    () =>
      areas?.map((area, index) => (
        <TextInputWithDeleteButton
          key={area.id}
          handleDeleteButtonPress={() => {
            deleteArea(area.id);
          }}
          handleOnChange={(e) => {
            setAreas((prev) =>
              prev.map((el) => {
                const newEl = { ...el };
                if (el.id === area.id) {
                  newEl.value = e.target.value;
                }
                return newEl;
              })
            );
          }}
          value={area.value}
          width="100%"
          {...(index !== areas.length - 1 && { marginBottom: '24px' })}
        />
      )),
    [areas]
  );

  return (
    <>
      <Typography color="greyIconsText" variant="w400-s14">
        {enTexts.claims.areaOfInterest}
      </Typography>
      {memoList.map((el) => el)}
      <Flex justifyContent="end" marginTop="12px">
        <Button backgroundColor="none" onClick={addArea} type="button">
          <Typography color="blueCta" textAlign="right" variant="w700-s14">
            {enTexts.buttonNames.addAreaOfInterest}
          </Typography>
        </Button>
      </Flex>
    </>
  );
};

AreaOfInterestInputs.propTypes = {
  getActualData: func.isRequired,
  initialData: arrayOf(string).isRequired
};

export default withFlexProps(AreaOfInterestInputs);
