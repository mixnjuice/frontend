import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
// import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as flavorActions } from 'reducers/flavor';
// import { actions as flavorsActions } from 'reducers/flavors';
import { getStash } from 'selectors/flavor';
// import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

export class Flavors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    collection: PropTypes.array,
    pager: PropTypes.object,
    pagerNavigation: PropTypes.node.isRequired,
    stash: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = { limit: 20, page: 1, stashControl: false };
    this.handlePageChange = this.changePage.bind(this);
    this.handleLimitChange = this.changeLimit.bind(this);
    this.handleLimitUpdate = this.updateLimit.bind(this);
    this.handleStashControl = this.stashController.bind(this);
    this.handleAddToStash = this.addToStash.bind(this);
    this.handleRemoveFromStash = this.removeFromStash.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestStash();
  }

  stashController(event) {
    const { stash } = this.props;
    const { holdings: stashMap } = this.state;

    if (!stashMap) {
      const holdings = [];

      stash.map(flavor => {
        holdings[flavor.flavorId] = true;
      });
      this.setState({ holdings });
    }
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    this.setState({
      [name]: checked
    });
  }

  addToStash(id) {
    const { actions } = this.props;

    actions.addStash({ id });

    const { holdings } = this.state;

    holdings[id] = true;

    this.setState({ holdings });
  }

  removeFromStash(id) {
    const { actions } = this.props;

    actions.removeStash({ id });

    const { holdings } = this.state;

    holdings[id] = false;

    this.setState({ holdings });
  }

  inStashIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleRemoveFromStash(id, e)}
        className="text-danger"
        icon="minus-square"
        size="2x"
        title="Remove from Stash"
      />
    );
  }

  noStashIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleAddToStash(id, e)}
        className="text-success"
        icon="plus-square"
        size="2x"
        title="Add to Stash"
      />
    );
  }

  render() {
    const { collection /* pager, pagerNavigation*/ } = this.props;
    const { holdings, stashControl } = this.state;

    return (
      <Container>
        <Helmet title="Flavors" />
        <Container fluid={true}>
          <Row className="text-center">
            <Col>
              <h1>Flavors</h1>
            </Col>
          </Row>
          {/* pagerNavigation*/}
        </Container>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              {stashControl && <th>Stash</th>}
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
                  {stashControl && (
                    <td className="text-center">
                      {holdings &&
                        (holdings[flavor.id] === true
                          ? this.inStashIcon(flavor.id)
                          : this.noStashIcon(flavor.id))}
                    </td>
                  )}
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
        {/* }
        {pagerNavigation}
        <PagerInfo contentType="Flavors" pager={pager} />
          */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stash: getStash(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...flavorActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Flavors);

/*
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withPagination(
    flavorsActions.requestFlavors,
    getAllFlavors,
    getFlavorsPager
  )(Flavors)
);*/

/* export default withPagination(
  flavorsActions.requestFlavors,
  getAllFlavors,
  getFlavorsPager
)(Flavors);*/
