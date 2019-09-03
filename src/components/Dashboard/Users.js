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

import { actions as usersActions } from 'reducers/users';
import { getAllUsers } from 'selectors/users';

export class Users extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array,
    opt: PropTypes.object
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.requestUsers();
  }

  render() {
    const { opt, users } = this.props;

    return (
      <Layout pageTitle="Users - Dashboard" header="Users" options={opt}>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
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
                  <td>{user.id}</td>
                  <td>{user.emailAddress}</td>
                  <td>{user.activationCode === null ? 'Yes' : 'No'}</td>
                  <td>
                    <Link to="/user/profile">Profile</Link>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={'#user/' + user.id + '/roles'}
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
)(Users);
