import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { Alert, Table } from 'react-bootstrap';

import { actions as usersActions } from 'reducers/users';
import { getUserRoles } from 'selectors/users';

export class UserRoles extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    roles: PropTypes.array,
    roleId: PropTypes.number,
    userId: PropTypes.number
  };
  constructor(props) {
    super(props);
    this.userId = this.props.userId;
  }

  componentWillMount() {
    const { actions, userId } = this.props;

    actions.requestUserRoles({ userId });
  }

  render() {
    const { layoutOptions, roles, roleId, userId } = this.props;

    let style = {};

    return (
      <Layout
        pageTitle="Roles - Dashboard"
        header={`User > User ID: ${userId} > Roles`}
        options={layoutOptions}
      >
        <DashLink to="#users" name="Users">
          Back
        </DashLink>{' '}
        &nbsp;
        <DashLink to="#roles" name="Roles">
          Roles
        </DashLink>
        {!roles && <Alert>No Roles Assigned to this User!</Alert>}
        {roles && (
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => {
                style = {};
                if (roleId === role.Role.id) {
                  style = { border: '2px solid red' };
                }
                return (
                  <tr key={index}>
                    <td>{role.Role.id}</td>
                    <td style={style}>{role.Role.name}</td>
                    <td>
                      <DashLink
                        to={`#role/${role.Role.id}/users`}
                        name="Role/Users"
                        item={{
                          userId,
                          roleId: role.Role.id,
                          name: role.Role.name
                        }}
                      >
                        Other Users
                      </DashLink>
                      &nbsp; | &nbsp;
                      <DashLink
                        to={`#role/${role.Role.id}/delete/user`}
                        name="Role/Delete/User"
                        item={{
                          userId,
                          roleId: role.Role.id,
                          name: role.Role.name
                        }}
                      >
                        Unassign Role
                      </DashLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <DashLink to="#users" name="Users">
          Back
        </DashLink>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  roles: getUserRoles(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRoles);
