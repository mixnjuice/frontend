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
    opt: PropTypes.object.isRequired,
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

    actions.requestRoles();
    if (roleId !== null) {
      actions.requestRoleUsers({ roleId });
    }
  }

  render() {
    const { name, opt, roleId, roleUsers } = this.props;

    return (
      <Layout
        pageTitle="Role Users - Dashboard"
        header={`Roles > ${name}`}
        options={opt}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#roles" name="Roles">
          Back
        </DashLink>
        {!roleUsers && <Alert>No Users Assigned to this Role!</Alert>}
        {roleUsers && (
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {roleUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.userId}</td>
                    <td>{user.User.emailAddress}</td>
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
  actions: bindActionCreators(
    {
      ...rolesActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleUsers);
