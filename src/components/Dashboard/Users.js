import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as usersActions } from 'reducers/users';
import { getAllUsers } from 'selectors/users';

export class Users extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array,
    layoutOptions: PropTypes.object
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.requestUsers();
  }

  render() {
    const { layoutOptions, users } = this.props;

    return (
      <Layout
        pageTitle="Users - Dashboard"
        header="Users"
        options={layoutOptions}
      >
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Email</th>
              <th>Activated</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{user.id}</td>
                  <td>{user.emailAddress}</td>
                  <td className="text-center">
                    {user.activationCode === null ? (
                      <FontAwesomeIcon icon="check" color="green" title="Yes" />
                    ) : (
                      <FontAwesomeIcon icon="times" color="red" title="No" />
                    )}
                  </td>
                  <td className="text-center">
                    <Link to="/user/profile">Profile</Link>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#user/${user.id}/roles`}
                      name="User/Roles"
                      item={user.id}
                    >
                      Roles
                    </DashLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  users: getAllUsers(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
