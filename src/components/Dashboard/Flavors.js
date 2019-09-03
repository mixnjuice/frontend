import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';
import { DashboardLayout as Layout } from 'components/Dashboard/';

import { actions as flavorsActions } from 'reducers/flavors';
import { getAllFlavors } from 'selectors/flavors';

export class Flavors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    opt: PropTypes.object.isRequired,
    flavors: PropTypes.array
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.requestFlavors();
  }

  render() {
    const { flavors, opt } = this.props;

    return (
      <Layout
        pageTitle="Flavors - Dashboard"
        header="Ingredients &gt; Flavors"
        options={opt}
      >
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Density</th>
            </tr>
          </thead>
          <tbody>
            {flavors.map((flavor, index) => {
              return (
                <tr key={index}>
                  <td>{flavor.id}</td>
                  <td>{flavor.Vendor.name}</td>
                  <td>{flavor.name}</td>
                  <td>{flavor.slug}</td>
                  <td>{flavor.density}</td>
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
  flavors: getAllFlavors(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(flavorsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flavors);
