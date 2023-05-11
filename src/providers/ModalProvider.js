import React, { createContext, useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';

import { Modal } from '@molecules';

export const ModalContext = createContext({
  hideModal: () => {},
  showModal: () => {}
});

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(null);
  const [modalScheduledState, setModalScheduledState] = useState(modalState);

  const modalContextValue = useMemo(
    () => ({
      hideModal: () => {
        setModalState(null);
      },
      showModal: setModalState
    }),
    []
  );
  useEffect(() => {
    if (modalState) {
      setModalScheduledState(modalState);
    } else {
      setTimeout(() => {
        setModalScheduledState(null);
      }, 500);
    }
  }, [modalState]);

  return (
    <ModalContext.Provider value={modalContextValue}>
      <Modal
        approveButtonText={modalScheduledState?.approveButtonText}
        contentText={modalScheduledState?.contentText}
        onApprove={modalScheduledState?.onApprove}
        onCancel={modalScheduledState?.onCancel}
        renderTitleComponent={modalScheduledState?.renderTitleComponent}
        slideAnimation={
          modalState?.slideAnimation || modalScheduledState?.slideAnimation
        }
        visible={!!modalState}
        withoutButtons={modalScheduledState?.withoutButtons}
      />
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.defaultProps = {
  children: null
};

ModalProvider.propTypes = {
  children: PropTypes.node
};
