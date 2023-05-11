import React, { useState, useEffect } from 'react';
import { bool, func, string } from 'prop-types';
import { Flex, Button, Typography } from '@mixins';
import { useModal } from '@hooks';
import enTexts from '@translations/en.json';
import FixedWindow from './Modal.styles';

const Modal = ({
  approveButtonText,
  onApprove,
  onCancel,
  contentText,
  renderTitleComponent,
  visible,
  withoutButtons,
  slideAnimation
}) => {
  const [visibleWithAnimation, setVisibleWithAnimation] = useState(visible);
  const inversedAnimationState = !visibleWithAnimation && visible;
  const { hideModal } = useModal();

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisibleWithAnimation(false);
      }, 500);
    } else {
      setTimeout(() => {
        setVisibleWithAnimation(true);
      }, 500);
    }
  }, [visible]);

  return (
    <>
      <FixedWindow
        backgroundColor="black"
        backgroundFlex
        height={`${window.innerHeight}5px`}
        left="50%"
        onClick={() => {
          hideModal();
          if (onCancel) {
            onCancel();
          }
        }}
        position="fixed"
        top="50%"
        {...(inversedAnimationState
          ? {
              visible: visibleWithAnimation,
              visibleWithAnimation: visible
            }
          : {
              visible,
              visibleWithAnimation
            })}
        width="105%"
      />
      <FixedWindow
        backgroundColor="white"
        borderRadius="6px"
        inversedAnimationState={inversedAnimationState}
        position="fixed"
        slideAnimation={slideAnimation}
        {...(inversedAnimationState
          ? {
              visible: visibleWithAnimation,
              visibleWithAnimation: visible
            }
          : {
              visible,
              visibleWithAnimation
            })}
        width="70%"
      >
        <Flex display="block" padding="24px">
          {renderTitleComponent && renderTitleComponent()}
          <Typography color="greyText" textAlign="center" variant="w400-s16">
            {contentText}
          </Typography>
        </Flex>
        {!withoutButtons && (
          <Flex borderTop="1px solid" borderTopColor="greyLine" width="100%">
            {onCancel && (
              <Button
                backgroundColor="none"
                onClick={onCancel}
                paddingX="0px"
                paddingY="14px"
                textAlign="center"
                width="50%"
              >
                <Typography color="greyText" variant="w400-s16">
                  {enTexts.buttonNames.cancel}
                </Typography>
              </Button>
            )}
            <Button
              backgroundColor="none"
              onClick={onApprove}
              paddingX="0px"
              paddingY="14px"
              textAlign="center"
              width={onCancel ? '50%' : '100%'}
            >
              <Typography color="blueCta" variant="w400-s16">
                {approveButtonText}
              </Typography>
            </Button>
          </Flex>
        )}
      </FixedWindow>
    </>
  );
};

Modal.defaultProps = {
  renderTitleComponent: null,
  onCancel: null,
  approveButtonText: null,
  onApprove: null,
  contentText: null,
  withoutButtons: false,
  slideAnimation: false
};

Modal.propTypes = {
  onApprove: func,
  contentText: string,
  approveButtonText: string,
  renderTitleComponent: func,
  onCancel: func,
  visible: bool.isRequired,
  withoutButtons: bool,
  slideAnimation: bool
};

export default Modal;
