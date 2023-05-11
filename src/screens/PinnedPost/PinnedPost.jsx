import React, { useState, useMemo } from 'react';
import { Button, Typography, Flex } from '@mixins';
import { ScreenWithHeader } from '@templates';
import { UploadInput, Icon } from '@atoms';
import { ReactComponent as BackButton } from '@svgs/buttons/back.svg';
import { ReactComponent as CloseButton } from '@svgs/buttons/close.svg';
import { useModal } from '@hooks';
import { IMAGE_EXTENSIONS } from '@constants';
import enTexts from '@translations/en.json';
import { organizedToRows } from './PinnedPost.helper';

const PinnedPost = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const { showModal, hideModal } = useModal();

  const deleteImage = (id) => () => {
    showModal({
      approveButtonText: enTexts.buttonNames.ok,
      onApprove: () => {
        setImages((prev) => prev.filter((elem) => elem.id !== id));
        hideModal();
      },
      onCancel: hideModal,
      renderTitleComponent: () => (
        <Typography marginBottom="10px" textAlign="center" variant="w700-s18">
          {enTexts.claims.deleteImage}
        </Typography>
      )
    });
  };

  const loadImage = (data) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) => {
        const id =
          prev.length === 0
            ? 0
            : Math.max.apply(
                null,
                prev.map((el) => el.id)
              ) + 1;
        return [
          ...prev,
          {
            image: reader.result,
            id
          }
        ];
      });
    };
    reader.readAsDataURL(data);
  };

  const handleOnSelect = (e) => {
    const { type } = e.target.files[0];
    if (IMAGE_EXTENSIONS.includes(type)) {
      setError(null);
      if (images.length < 5) {
        loadImage(e.target.files[0]);
      } else {
        setError(enTexts.errorMessages.maxImages);
      }
    } else {
      setError(enTexts.errorMessages.imagesAllowed);
    }
  };

  const memoList = useMemo(
    () =>
      organizedToRows(3, images).map((orgImages, index) => (
        <Flex {...(index === 0 && { marginBottom: '8px' })}>
          {orgImages.map((el) => (
            <Flex key={el.id} position="relative">
              <Flex
                background={`url("${el.image}") no-repeat center/cover`}
                borderRadius="6px"
                height="108px"
                marginRight="9px"
                width="108px"
              />
              <Flex
                onClick={deleteImage(el.id)}
                position="absolute"
                right="10px"
                top="0px"
              >
                <Icon
                  color="white"
                  height="24px"
                  Svg={CloseButton}
                  width="24px"
                />
              </Flex>
            </Flex>
          ))}
          {(images.length < 3 || index === 1) && (
            <UploadInput handleOnSelect={handleOnSelect} />
          )}
        </Flex>
      )),
    [images]
  );

  return (
    <ScreenWithHeader
      renderCenterComponent={() => (
        <Typography variant="w700-s18">{enTexts.claims.pinnedPost}</Typography>
      )}
      renderLeftComponent={() => (
        <Button
          backgroundColor="none"
          display="flex"
          marginX="17px"
          marginY="16px"
          padding="0px"
        >
          <BackButton />
        </Button>
      )}
    >
      <Flex
        flexDirection="column"
        height={window.innerHeight - 125}
        justifyContent="space-between"
        marginLeft="16px"
        marginRight="17px"
        marginTop="24px"
      >
        <Flex flexDirection="column">
          <Typography
            color="greyIconsText"
            marginBottom="16px"
            variant="w400-s14"
          >
            {enTexts.claims.uploadImage}
          </Typography>
          <Flex flexDirection="column">
            {memoList.map((el) => el)}
            {(images.length === 0 || images.length === 3) && (
              <UploadInput handleOnSelect={handleOnSelect} />
            )}
          </Flex>
          {error && (
            <Typography color="red" marginTop="24px">
              {error}
            </Typography>
          )}
        </Flex>
        <Flex>
          <Button
            marginBottom="40px"
            paddingY="13px"
            type="submit"
            variant="primary"
            width="100%"
          >
            <Typography color="white" variant="w700-s16">
              {enTexts.buttonNames.publish}
            </Typography>
          </Button>
        </Flex>
      </Flex>
    </ScreenWithHeader>
  );
};

export default PinnedPost;
