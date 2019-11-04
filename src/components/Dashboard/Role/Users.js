import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Alert, Table } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as rolesActions } from 'reducers/roles';
import { getRoleUsers } from 'selectors/roles';

export class RoleUsers extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    roleId: PropTypes.number,
    name: PropTypes.string,
    roleUsers: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.updateRoleId = this.updateRoleId.bind(this);
  }
  updateRoleId(roleId) {
    const { actions } = this.props;

    actions.requestRoleUsers({ roleId });
  }
  componentDidMount() {
    const { actions, roleId } = this.props;

    // actions.requestRoles();
    if (roleId !== null) {
      actions.requestRoleUsers({ roleId });
    }
  }

  render() {
    const { name, layoutOptions, roleId, roleUsers } = this.props;

    return (
      <Layout
        pageTitle="Role Users - Dashboard"
        header={`Roles > ${name}`}
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#roles" name="Roles">
          Back
        </DashLink>
        {!roleUsers ? (
          <Alert>No Users Assigned to this Role!</Alert>
        ) : (
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {roleUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{user.userId}</td>
                    <td className="text-center">
                      {user.User.UserProfile.name}
                    </td>
                    <td className="text-center">{user.User.emailAddress}</td>
                    <td>
                      <DashLink
                        to={`#role/${roleId}/delete/user`}
                        name="Role/Delete/User"
                        item={{
                          userId: user.userId,
                          roleId,
                          name
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
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  roleUsers: getRoleUsers(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(rolesActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleUsers);
