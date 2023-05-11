import React, { useMemo } from 'react';
import { Icon } from '@atoms';
import { Flex, Image, Typography } from '@mixins';
import { ReactComponent as Information } from '@svgs/icons/information.svg';
import enTexts from '@translations/en.json';
import { withFlexProps } from '@hocs';
import { useModal } from '@hooks';
import { func } from 'prop-types';
import { menuItemsProps } from './ExploreMenu.layoutProps';

const ExploreMenu = ({ openDefiniteTab }) => {
  const { showModal, hideModal } = useModal();

  const handleOpenModal = () => {
    showModal({
      approveButtonText: enTexts.buttonNames.ok,
      contentText: enTexts.claims.certificationAvailableOnPeerefWebsite,
      onApprove: handleModalCancelButtonClick,
      renderTitleComponent: () => (
        <Typography marginBottom="10px" textAlign="center" variant="w700-s18">
          {enTexts.claims.comingSoon}
        </Typography>
      )
    });
  };

  const handleModalCancelButtonClick = () => {
    hideModal();
  };
  const handleOnTabClick = (keyWord) => () => {
    if (keyWord === 'reviewer_certification') {
      handleOpenModal();
    } else if (
      keyWord === 'journals' ||
      keyWord === 'funding' ||
      keyWord === 'researchers'
    ) {
      openDefiniteTab(keyWord);
    }
  };

  const memoList = useMemo(
    () =>
      menuItemsProps.map((el) => (
        <Flex key={el.id} onClick={handleOnTabClick(el.key_word)}>
          <Flex position="relative">
            {el.id === 6 && (
              <Icon
                height="24px"
                position="absolute"
                right="12px"
                Svg={Information}
                top="12px"
                width="24px"
              />
            )}
            <Flex height="100%" position="absolute" width="100%">
              <Typography
                color="white"
                marginY="auto"
                opacity={el.id === 6 ? '65%' : '100%'}
                paddingX="14px"
                textAlign="center"
                variant="w700-s18"
                width="100%"
              >
                {el.title}
              </Typography>
            </Flex>
            <Image
              alt="lal"
              borderRadius="9px"
              height="188px"
              src={el.src}
              width="163px"
            />
          </Flex>
        </Flex>
      )),
    [menuItemsProps]
  );
  return (
    <Flex
      display="grid"
      gridColumnGap="16px"
      gridRowGap="16px"
      gridTemplateColumns="163px 180px;"
    >
      {memoList.map((el) => el)}
    </Flex>
  );
};

ExploreMenu.propTypes = {
  openDefiniteTab: func.isRequired
};

export default withFlexProps(ExploreMenu);
