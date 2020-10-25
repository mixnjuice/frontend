import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from 'selectors/application';

export default function PrivateRoute({ component: Component, ...routeProps }) {
  const authenticated = useSelector(isLoggedIn);

  return (
    <Route
      {...routeProps}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};
