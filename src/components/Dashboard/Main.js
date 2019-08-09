import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Flavors, Home, Migrations, Roles, RoleUsers, Users } from '.';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

class Main extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dashboardComponent: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }
  display() {
    const { dashboardComponent } = this.props;

    switch (dashboardComponent.name) {
      case 'Flavors':
        return <Flavors />;
      case 'Migrations':
        return <Migrations />;
      case 'Roles':
        return <Roles />;
      case 'RoleUsers':
        return <RoleUsers item={dashboardComponent.item} />;
      case 'Users':
        return <Users />;
      case 'Home':
      default:
        return <Home />;
    }
  }
  render() {
    return <Fragment>{this.display()}</Fragment>;
  }
}

const mapStateToProps = state => ({
  dashboardComponent: getDashboardComponent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...dashboardActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
