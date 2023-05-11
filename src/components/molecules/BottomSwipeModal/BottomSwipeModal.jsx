import React, { useMemo } from 'react';
import { arrayOf, func, shape, string, bool } from 'prop-types';
import { Flex, Button, Typography } from '@mixins';
import { Icon } from '@atoms';
import enTexts from '@translations/en.json';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import { ReactComponent as Time } from '@svgs/icons/time.svg';
import { FixedWindow, BackButtonWrapper } from './BottomSwipeModal.styles';

const BottomSwipeModal = ({
  renderTitleComponent,
  handleOnSelectOption,
  data,
  nestedData,
  changeContent,
  visible,
  withoutPadding,
  searchModal,
  handleOnDeleteHistory
}) => {
  const memoButtonsList = useMemo(
    () =>
      (data || Object.keys(nestedData)).map((el) => (
        <Flex key={el} marginBottom="28px" width="100%">
          <Button
            backgroundColor="none"
            onClick={() =>
              // eslint-disable-next-line prettier/prettier
              (data ? handleOnSelectOption(el) : changeContent(el))}
            type="button"
            width="100%"
          >
            <Flex justifyContent="space-between">
              <Flex>
                {searchModal && <Time />}
                <Typography
                  {...(searchModal && { marginLeft: '12px' })}
                  textAlign="start"
                  variant="w400-s16"
                >
                  {el}
                </Typography>
              </Flex>
              {nestedData && !data && (
                <BackButtonWrapper>
                  <Icon height="24px" Svg={BackButton} width="24px" />
                </BackButtonWrapper>
              )}
            </Flex>
          </Button>
        </Flex>
      )),
    [nestedData, data]
  );
  return (
    <>
      {visible && (
        <FixedWindow
          backgroundColor="black"
          display="block"
          height={`${window.innerHeight}5px`}
          left="50%"
          opacity="50%"
          position="fixed"
          top="50%"
          transform="translate(-50%, -50%)"
          width="105%"
        />
      )}
      <FixedWindow
        backgroundColor="white"
        borderTopLeftRadius="6px"
        borderTopRightRadius="6px"
        clicked={visible}
        display="block"
        height={`${window.innerHeight - 50}px`}
        left="50%"
        opacity="100%"
        position="fixed"
        top="53.1%"
        width="100%"
      >
        <Flex display="block" {...(!withoutPadding && { padding: '24px' })}>
          {renderTitleComponent && renderTitleComponent()}
        </Flex>
        <Flex
          display="block"
          marginX={searchModal ? '16px' : '25px'}
          marginY="15px"
        >
          {memoButtonsList.map((el) => el)}
        </Flex>
        {searchModal && (
          <Flex
            bottom="41px"
            marginLeft="17px"
            marginRight="16px"
            position="absolute"
          >
            <Button
              backgroundColor="none"
              border="1px solid"
              borderColor="grey"
              onClick={handleOnDeleteHistory}
              paddingBottom="14.5px"
              paddingTop="13.5px"
            >
              <Typography paddingX="93.2px" variant="w700-s14">
                {enTexts.buttonNames.deleteHistory}
              </Typography>
            </Button>
          </Flex>
        )}
      </FixedWindow>
    </>
  );
};

BottomSwipeModal.defaultProps = {
  renderTitleComponent: null,
  data: null,
  nestedData: null,
  changeContent: null,
  withoutPadding: false,
  searchModal: false,
  handleOnDeleteHistory: null
};

BottomSwipeModal.propTypes = {
  renderTitleComponent: func,
  handleOnSelectOption: func.isRequired,
  data: arrayOf(string),
  nestedData: shape(),
  changeContent: func,
  visible: bool.isRequired,
  withoutPadding: bool,
  searchModal: bool,
  handleOnDeleteHistory: func
};

export default BottomSwipeModal;
