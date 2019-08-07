import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';
import { getFlavors } from 'selectors/application';

export class Flavors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    flavors: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestFlavors();
  }

  render() {
    const { flavors } = this.props;

    return (
      <Fragment>
        <Helmet title="Flavors - Dashboard" />
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  flavors: getFlavors(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flavors);
