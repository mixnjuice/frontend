import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { Col, Container, Row, Table } from 'react-bootstrap';
import ToggleButton from 'components/ToggleButton/ToggleButton';
import { actions as appActions } from 'reducers/application';
import { actions as flavorActions } from 'reducers/flavor';
import { actions as flavorsActions } from 'reducers/flavors';
import { isLoggedIn } from 'selectors/application';
import { getStash, isLoaded } from 'selectors/flavor';
import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

export class Flavors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired,
    stash: PropTypes.array,
    stashLoaded: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { stashToggle: false };

    const { loggedIn } = this.props;

    if (loggedIn) {
      this.handleStashToggle = this.handleStashToggle.bind(this);
      this.handleAddToStash = this.addToStash.bind(this);
      this.handleRemoveFromStash = this.removeFromStash.bind(this);
    }
  }

  componentDidMount() {
    const { actions, loggedIn, stashLoaded } = this.props;

    if (loggedIn) {
      if (!stashLoaded) {
        actions.requestStash();
      }
    }
  }

  handleStashToggle() {
    const { stash } = this.props;
    const { holdings: stashMap } = this.state;
    const holdings = {};

    const { stashToggle } = this.state;

    if (!stashMap) {
      stash.map(flavor => {
        holdings[flavor.flavorId] = true;
      });

      this.setState({ stashToggle: !stashToggle, holdings });
    } else {
      this.setState({ stashToggle: !stashToggle });
    }
  }

  get stashToggle() {
    const { stashToggle } = this.state;

    return (
      <ToggleButton
        value={stashToggle}
        onClick={e => this.handleStashToggle(e)}
        title={!stashToggle ? 'Enable Flavor Stash' : 'Disable Flavor Stash'}
        variant="switch"
      />
    );
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

  stashIcon(id, has) {
    return (
      <ToggleButton
        value={has}
        onClick={
          has
            ? e => this.handleRemoveFromStash(id, e)
            : e => this.handleAddToStash(id, e)
        }
        title={has ? 'Remove from Stash' : 'Add to Stash'}
        variant="check"
      />
    );
  }

  render() {
    const { collection, loggedIn, pager, pagerNavigation } = this.props;
    const { holdings, stashToggle } = this.state;

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
            <Col className="text-left ml-2 mb-4">
              {loggedIn ? (
                <Fragment>
                  {this.stashToggle} <span>Enable Flavor Stash</span>
                </Fragment>
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
              {loggedIn ? stashToggle && <th>Stash</th> : null}
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
                  {stashToggle ? (
                    <td className="text-center">
                      {this.stashIcon(flavor.id, Boolean(holdings[flavor.id]))}
                    </td>
                  ) : null}
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
  stash: getStash(state),
  stashLoaded: isLoaded(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...appActions, ...flavorActions }, dispatch)
});

export default withPagination(
  flavorsActions.requestFlavors,
  getAllFlavors,
  getFlavorsPager
)(connect(mapStateToProps, mapDispatchToProps)(Flavors));
