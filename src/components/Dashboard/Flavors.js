import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { DashboardLayout as Layout } from 'components/Dashboard/';

import { actions as flavorsActions } from 'reducers/flavors';
import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

export class Flavors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    collection: PropTypes.array,
    pager: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { limit: 20, page: 1 };
    this.handlePageChange = this.changePage.bind(this);
    this.handleLimitChange = this.changeLimit.bind(this);
    this.handleLimitUpdate = this.updateLimit.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestFlavors({ page: 1, limit: 20 });
  }

  pagerCounter() {
    const { pages } = this.props.pager;

    return [...Array(pages).keys()].map(value => value + 1);
  }

  changePage(page) {
    const { actions, pager } = this.props;
    const {
      target: { value }
    } = page;

    this.setState({ page: value });
    actions.requestFlavors({ ...pager, page: Number(value) });
  }

  changeLimit(limit) {
    const {
      target: { value }
    } = limit;

    this.setState({ limit: value });
  }

  updateLimit() {
    const { actions, pager } = this.props;
    const { limit } = this.state;

    actions.requestFlavors({ ...pager, limit: Number(limit) });
  }

  render() {
    const { collection, layoutOptions, pager } = this.props;

    return (
      <Layout
        pageTitle="Flavors - Dashboard"
        header="Ingredients &gt; Flavors"
        options={layoutOptions}
      >
        <Container fluid={true}>
          <Row className="pb-2">
            <Col xs={3}>
              <input
                type="number"
                min="20"
                max="200"
                step="20"
                className="form-control"
                onChange={this.handleLimitChange}
                onBlur={this.handleLimitUpdate}
                value={this.state.limit}
              />
            </Col>
            <Col className="text-right">
              <select
                value={this.state.page}
                onChange={this.handlePageChange}
                onBlur={this.handlePageChange}
              >
                {this.pagerCounter().map((value, i) => (
                  <option value={value} key={i}>
                    Page {value}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Container>
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
        <Container fluid={true}>
          <Row>
            <Col xs={3}>
              <input
                type="number"
                min="20"
                max="200"
                step="20"
                className="form-control"
                onChange={this.handleLimitChange}
                onBlur={this.handleLimitUpdate}
                value={this.state.limit}
              />
            </Col>
            <Col className="text-right">
              <select
                value={this.state.page}
                onChange={this.handlePageChange}
                onBlur={this.handlePageChange}
              >
                {this.pagerCounter().map((value, i) => (
                  <option value={value} key={i}>
                    Page {value}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>{pager.count} Flavors</Col>
            <Col className="text-right">{pager.pages} Pages</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  collection: getAllFlavors(state),
  pager: getFlavorsPager(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(flavorsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flavors);
