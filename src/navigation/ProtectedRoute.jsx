import React from 'react';
import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { ROUTES, LOCALSTORAGE } from '@constants';
import { getDataFromLS } from '../store/localStorage';

const ProtectedRoute = ({ children }) => {
  const token = getDataFromLS(LOCALSTORAGE.activeUser);

  const isLoggedIn = token?.token || null;

  if (!isLoggedIn) {
    return <Navigate replace to={ROUTES.signIn} />;
  }

  return children;
};

ProtectedRoute.defaultProps = {
  children: null
};

ProtectedRoute.propTypes = {
  children: PropTypes.node
};

export default ProtectedRoute;
