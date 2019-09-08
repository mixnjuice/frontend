import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  Flavors,
  DashboardHome as Home,
  Migrations,
  DashboardNotFound as NotFound,
  Roles,
  RoleAdd,
  RoleEdit,
  RoleDelete,
  RoleUsers,
  RoleAddUser,
  RoleDeleteUser,
  Users,
  UserRoles
} from 'components/Dashboard/';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

class DashboardMain extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dashboardComponent: PropTypes.object.isRequired
  };
  render() {
    const { dashboardComponent } = this.props;
    const { name, item } = dashboardComponent;
    const defaultLayoutOptions = {
      border: false,
      header: true,
      title: false,
      style: {}
    };

    switch (name) {
      case 'Home':
        return <Home />;
      case 'Flavors':
        return <Flavors layoutOptions={defaultLayoutOptions} />;
      case 'Migrations':
        return <Migrations layoutOptions={defaultLayoutOptions} />;
      case 'Roles':
        return <Roles layoutOptions={defaultLayoutOptions} />;
      case 'Role/Add':
        return <RoleAdd layoutOptions={defaultLayoutOptions} />;
      case 'Role/Edit':
        return (
          <RoleEdit
            layoutOptions={defaultLayoutOptions}
            roleId={item.roleId}
            name={item.name}
          />
        );
      case 'Role/Delete':
        return (
          <RoleDelete
            layoutOptions={defaultLayoutOptions}
            roleId={item.roleId}
            name={item.name}
          />
        );
      case 'Role/Users':
        return (
          <RoleUsers
            layoutOptions={defaultLayoutOptions}
            roleId={item.roleId}
            name={item.name}
          />
        );
      case 'Role/Add/User':
        return (
          <RoleAddUser
            layoutOptions={defaultLayoutOptions}
            roleId={item.roleId}
            name={item.name}
          />
        );
      case 'Role/Delete/User':
        return (
          <RoleDeleteUser
            layoutOptions={defaultLayoutOptions}
            userId={item.userId}
            roleId={item.roleId}
            name={item.name}
          />
        );
      case 'Users':
        return <Users layoutOptions={defaultLayoutOptions} />;
      case 'User/Roles':
        return <UserRoles layoutOptions={defaultLayoutOptions} userId={item} />;
      default:
        return <NotFound layoutOptions={defaultLayoutOptions} name={name} />;
    }
  }
}

const mapStateToProps = state => ({
  dashboardComponent: getDashboardComponent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardMain);
