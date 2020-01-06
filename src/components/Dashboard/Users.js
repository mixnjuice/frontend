import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PagerInfo, withPagination } from 'components/Pagination';
import { actions as usersActions } from 'reducers/users';
import { getAllUsers, getUsersPager } from 'selectors/users';

export class Users extends Component {
  static propTypes = {
    layoutOptions: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };

  get yesIcon() {
    return <FontAwesomeIcon icon="check" color="green" title="Yes" />;
  }

  get noIcon() {
    return <FontAwesomeIcon icon="times" color="red" title="No" />;
  }

  render() {
    const { collection, layoutOptions, pager, pagerNavigation } = this.props;

    return (
      <Layout
        pageTitle="Users - Dashboard"
        header="Users"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Activated</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{user.id}</td>
                  <td className="text-center">user.UserProfile.name</td>
                  <td className="text-center">{user.emailAddress}</td>
                  <td className="text-center">
                    {user.activationCode === null ? this.yesIcon : this.noIcon}
                  </td>
                  <td className="text-center">
                    <Link to="/user/profile">Profile</Link>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#user/${user.id}/roles`}
                      name="User/Roles"
                      item={Number(user.id)}
                    >
                      Roles
                    </DashLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pagerNavigation}
        <PagerInfo contentType="Users" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  Users,
  usersActions,
  'requestUsers',
  getUsersPager,
  getAllUsers
);
