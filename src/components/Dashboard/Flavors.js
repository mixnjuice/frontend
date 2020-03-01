import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { DashboardLayout as Layout } from 'components/Dashboard';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { actions as flavorsActions } from 'reducers/flavors';
import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

export class Flavors extends Component {
  static propTypes = {
    layoutOptions: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };

  render() {
    const { collection, layoutOptions, pager, pagerNavigation } = this.props;

    return (
      <Layout
        pageTitle="Flavors - Dashboard"
        header="Ingredients &gt; Flavors"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Vendor</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Density</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((flavor, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{flavor.id}</td>
                  <td>{flavor.Vendor.name}</td>
                  <td>{flavor.name}</td>
                  <td className="text-center">{flavor.slug}</td>
                  <td className="text-center">{flavor.density}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pagerNavigation}
        <PagerInfo contentType="Flavors" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  flavorsActions.requestFlavors,
  getAllFlavors,
  getFlavorsPager
)(Flavors);
