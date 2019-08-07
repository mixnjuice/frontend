import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { actions as usersActions } from 'reducers/users';
import { getAllUsers } from 'selectors/users';

export class Users extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <Fragment>
        <Helmet title="Users - Dashboard" />
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.userId}</td>
                  <td>
                    <Link to="/user/profile">{user.name}</Link>
                  </td>
                  <td>options</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Fragment>
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
