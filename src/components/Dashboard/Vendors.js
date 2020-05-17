import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { actions as vendorsActions } from 'reducers/vendors';
import { getAllVendors, getVendorsPager } from 'selectors/vendors';

export class Vendors extends Component {
  static propTypes = {
    layoutOptions: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node
  };

  render() {
    const { collection, layoutOptions, pager, pagerNavigation } = this.props;

    return (
      <Layout
        pageTitle="Vendors - Dashboard"
        header="Ingredients &gt; Vendors"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Code</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((vendor, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td className="text-center">{vendor.slug}</td>
                  <td className="text-center">{vendor.code}</td>
                  <td className="text-center">
                    <DashLink
                      to={`#vendors/edit/${vendor.id}`}
                      name="Vendor/Edit"
                      item={vendor.id}
                    >
                      Edit
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#vendor/delete/${vendor.id}`}
                      name="Vendor/Delete"
                      item={{ vendorId: vendor.id, name: vendor.name }}
                    >
                      Delete
                    </DashLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pagerNavigation}
        <PagerInfo contentType="Vendors" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  vendorsActions.requestVendors,
  getAllVendors,
  getVendorsPager
)(Vendors);
