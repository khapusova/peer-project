import React, { useState } from 'react';
import { Flex, Button, Typography } from '@mixins';
import { withFlexProps } from '@hocs';
import enTexts from '@translations/en.json';
import { SHOW_MORE_MIN_SYMBOLS } from '@constants';
import { string, number, func } from 'prop-types';
import { BlueText, GreyText } from './ShowMore.styles';

const ShowMore = ({
  title,
  fullText,
  numberOfSymbols,
  replyCommentTo,
  onTextClick
}) => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(true);
  const isNeedToBeShorten = fullText.length > numberOfSymbols;

  const shortenText = isNeedToBeShorten
    ? `${fullText.slice(0, numberOfSymbols)}...`
    : fullText;

  const handleShowTextButtonClick = () => {
    setIsFullTextVisible((prev) => !prev);
  };

  return (
    <Flex display="block">
      {title && (
        <Typography marginBotton="1px" variant="w700-s16">
          {title}
        </Typography>
      )}
      <Typography color="greyText" variant="w400-s16">
        {replyCommentTo && (
          <BlueText color="blueCta" variant="w400-s16">
            {`@${replyCommentTo} `}
          </BlueText>
        )}
        <GreyText {...(onTextClick && { onClick: onTextClick })}>
          {isFullTextVisible ? shortenText : fullText}
        </GreyText>
        {isNeedToBeShorten && (
          <Button backgroundColor="none" onClick={handleShowTextButtonClick}>
            <Typography color="greyDark" variant="w400-s16">
              {isFullTextVisible
                ? enTexts.buttonNames.showMore
                : enTexts.buttonNames.showLess}
            </Typography>
          </Button>
        )}
      </Typography>
    </Flex>
  );
};

ShowMore.defaultProps = {
  numberOfSymbols: SHOW_MORE_MIN_SYMBOLS,
  title: null,
  replyCommentTo: null,
  onTextClick: null
};

ShowMore.propTypes = {
  title: string,
  fullText: string.isRequired,
  numberOfSymbols: number,
  replyCommentTo: string,
  onTextClick: func
};

export default withFlexProps(ShowMore);
