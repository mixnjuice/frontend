import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { CardColumns, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getStats } from 'selectors/dashboard';

export class DashboardHome extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    stats: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    const { actions } = this.props;

    actions.requestStats();
  }

  render() {
    const { stats } = this.props;
    const {
      activatedUsers,
      flavors,
      flavorTags,
      recipes,
      recipeTags,
      tags,
      users,
      userTokens,
      vendors
    } = stats;

    return (
      <Fragment>
        <CardColumns>
          <Helmet title="Dashboard" />
          <Card bg="danger" text="white">
            <Card.Header>Users: {users}</Card.Header>
            <Card.Body>
              <h3>Activated Users: {activatedUsers}</h3>
              <h3>Inactive Users: {users - activatedUsers}</h3>
              <h3>Active Tokens: {userTokens}</h3>
            </Card.Body>
          </Card>
          <Card bg="primary" text="white">
            <Card.Body>
              <h2>Tags: {tags}</h2>
            </Card.Body>
          </Card>
          <Card bg="secondary" text="white">
            <Card.Body>
              <h2>Vendors: {vendors}</h2>
            </Card.Body>
          </Card>
          <Card bg="info" text="white">
            <Card.Header>Flavors: {flavors}</Card.Header>
            <Card.Body>
              <h2>Tags: {flavorTags}</h2>
            </Card.Body>
          </Card>
          <Card bg="warning" text="white">
            <Card.Header>Recipes: {recipes}</Card.Header>
            <Card.Body>
              <h2>Tags: {recipeTags}</h2>
            </Card.Body>
          </Card>
        </CardColumns>
        <a href="#home" onClick={this.refresh} title="Refresh Stats">
          <FontAwesomeIcon icon="sync" />
        </a>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  stats: getStats(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHome);
