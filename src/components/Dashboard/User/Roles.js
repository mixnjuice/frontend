import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import DashLink from 'components/Dashboard/Link';
import { Table } from 'react-bootstrap';

import { actions as usersActions } from 'reducers/users';
import { getUserRoles } from 'selectors/users';

export class UserRoles extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    roles: PropTypes.array,
    userId: PropTypes.number
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions, userId } = this.props;

    actions.requestUserRoles({ userId });
  }

  render() {
    const { roles, userId } = this.props;

    return (
      <Fragment>
        <Helmet title="Roles - Dashboard" />
        <h2>User &gt; User ID: {userId} &gt; Roles</h2>
        <DashLink to="#users" name="Users">
          Back
        </DashLink>{' '}
        &nbsp;
        <DashLink to="#roles" name="Roles">
          Roles
        </DashLink>
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
              return (
                <tr key={index}>
                  <td>{role.Role.id}</td>
                  <td>{role.Role.name}</td>
                  <td>
                    <DashLink
                      to={'#role/users/' + role.Role.id}
                      name="Role/Users"
                      item={role.Role.id}
                    >
                      Users
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#role/${role.Role.id}/add/user`}
                      name="Role/Add/User"
                      item={{ roleId: role.Role.id, name: role.Role.name }}
                    >
                      Assign
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={'#role/edit/' + role.Role.id}
                      name="Role/Edit"
                      item={{ roleId: role.Role.id, name: role.Role.name }}
                    >
                      Edit
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={'#role/delete/' + role.Role.id}
                      name="Role/Delete"
                      item={{ roleId: role.Role.id, name: role.Role.name }}
                    >
                      Delete
                    </DashLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <DashLink to="#users" name="Users">
          Back
        </DashLink>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  roles: getUserRoles(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...usersActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRoles);
