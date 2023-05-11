import React from 'react';
import { shape, bool } from 'prop-types';
import { Typography } from '@mixins';
import { withFlexProps } from '@hocs';

const ErrorMessage = ({ formik, withoutPadding }) => {
  const { errors } = formik;
  const firstError =
    Object.keys(errors)[0] === undefined ? null : Object.keys(errors)[0];

  return (
    <Typography
      {...(!withoutPadding && { paddingY: '50px' })}
      textAlign="center"
      use="error"
      variant="w400-s16"
    >
      {errors[firstError]}
    </Typography>
  );
};

ErrorMessage.defaultProps = {
  withoutPadding: false
};

ErrorMessage.propTypes = {
  formik: shape().isRequired,
  withoutPadding: bool
};

export default withFlexProps(ErrorMessage);
