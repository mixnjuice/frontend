import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import React, { Component as ReactComponent } from 'react';

import { isLoggedIn } from 'selectors/application';

export class PrivateRoute extends ReactComponent {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      .isRequired,
    authenticated: PropTypes.bool.isRequired
  };

  render() {
    const { component: Component, authenticated, ...routeProps } = this.props;

    return (
      <Route
        {...routeProps}
        render={props =>
          authenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  authenticated: isLoggedIn(state)
});

export default connect(mapStateToProps, null)(PrivateRoute);
