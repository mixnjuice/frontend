import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard';
import { Table } from 'react-bootstrap';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles, getRolesPager } from 'selectors/roles';

export class Roles extends Component {
  static propTypes = {
    layoutOptions: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };

  noEdit(role) {
    // Don't allow editing of Adminstrator or User roles
    return role === 'Administrator' || role === 'User' ? true : false;
  }

  render() {
    const { collection, layoutOptions, pager, pagerNavigation } = this.props;

    return (
      <Layout
        pageTitle="Roles - Dashboard"
        header="Roles"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((role, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <DashLink
                      to={`#role/users/${role.id}`}
                      name="Role/Users"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Users
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#role/${role.id}/add/user`}
                      name="Role/Add/User"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Assign
                    </DashLink>
                    {!this.noEdit(role.name) && (
                      <Fragment>
                        &nbsp; | &nbsp;
                        <DashLink
                          to={`#role/edit/${role.id}`}
                          name="Role/Edit"
                          item={{ roleId: role.id, name: role.name }}
                        >
                          Edit
                        </DashLink>
                        &nbsp; | &nbsp;
                        <DashLink
                          to={`#role/delete/${role.id}`}
                          name="Role/Delete"
                          item={{ roleId: role.id, name: role.name }}
                        >
                          Delete
                        </DashLink>
                      </Fragment>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pagerNavigation}
        <PagerInfo contentType="Roles" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  rolesActions.requestRoles,
  getAllRoles,
  getRolesPager
)(Roles);
