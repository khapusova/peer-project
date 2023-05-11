import React, { useMemo, useEffect } from 'react';
import { useModal } from '@hooks';
import { Tabs, SuggestedContent } from '@atoms';
import { shape, number, func, arrayOf } from 'prop-types';
import FixedWindow from './CarouselWithTabs.styles';

const CarouselWithTabs = ({ dataProps, setPageId, pageId }) => {
  const { showModal, hideModal } = useModal();
  const [tempProps] = useMemo(
    () => dataProps.filter((el) => el.id === pageId),
    [pageId, dataProps]
  );

  const handleOpenModal = (renderComponent) => {
    showModal({
      slideAnimation: true,
      onCancel: () => {
        hideModal();
        setPageId(null);
      },
      withoutButtons: true,
      renderTitleComponent: renderComponent
    });
  };

  useEffect(() => {
    setTimeout(
      () =>
        handleOpenModal(() => (
          <SuggestedContent eventInfo={tempProps} inModal />
        )),
      515
    );
    return hideModal();
  }, [pageId]);

  return (
    <FixedWindow>
      <Tabs
        changeContent={(ID) => {
          setPageId(ID);
        }}
        justifyContent="center"
        tabID={pageId}
        tabsProps={dataProps.map((el) => ({ id: el.id }))}
        width="100%"
        withoutText
      />
    </FixedWindow>
  );
};

CarouselWithTabs.propTypes = {
  dataProps: arrayOf(shape).isRequired,
  pageId: number.isRequired,
  setPageId: func.isRequired
};

export default CarouselWithTabs;
