import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as appActions } from 'reducers/application';
import { actions as flavorActions } from 'reducers/flavor';
import { actions as flavorsActions } from 'reducers/flavors';
import { isLoggedIn } from 'selectors/application';
import { getStash } from 'selectors/flavor';
import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

export class UserFlavors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    pager: PropTypes.object,
    pagerNavigation: PropTypes.node.isRequired,
    stash: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = { stashControl: false };

    const { actions, loggedIn } = this.props;

    if (loggedIn) {
      actions.requestStash();
      this.handleStashControl = this.stashController.bind(this);
      this.handleAddToStash = this.addToStash.bind(this);
      this.handleRemoveFromStash = this.removeFromStash.bind(this);
    }
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
    const { collection, loggedIn, pager, pagerNavigation } = this.props;
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
          <Row>
            <Col className="text-center">
              {loggedIn ? (
                <Form>
                  <Form.Check
                    name="stashControl"
                    type="checkbox"
                    id="flavorStash"
                    label="&nbsp;Enable Flavor Stash"
                    onChange={this.handleStashControl}
                  />
                </Form>
              ) : (
                <small>Log in to Enable Flavor Stash</small>
              )}
            </Col>
          </Row>
          {pagerNavigation}
        </Container>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              {loggedIn ? stashControl && <th>Stash</th> : null}
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
                  {loggedIn
                    ? stashControl && (
                        <td className="text-center">
                          {holdings &&
                            (holdings[flavor.id] === true
                              ? this.inStashIcon(flavor.id)
                              : this.noStashIcon(flavor.id))}
                        </td>
                      )
                    : null}
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state),
  stash: getStash(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...appActions, ...flavorActions }, dispatch)
});

/* export default connect(mapStateToProps, mapDispatchToProps)(Flavors);*/

export default withPagination(
  flavorsActions.requestFlavors,
  getAllFlavors,
  getFlavorsPager
)(connect(mapStateToProps, mapDispatchToProps)(UserFlavors));

/* export default withPagination(
  flavorsActions.requestFlavors,
  getAllFlavors,
  getFlavorsPager
)(Flavors);*/
