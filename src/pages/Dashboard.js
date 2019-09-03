import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Menu, Main } from 'components/Dashboard/';
import { Container, Row, Col } from 'react-bootstrap';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

export class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.requestStats();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <Menu />
          </Col>
          <Col xs={12} md={9}>
            <Main />
          </Col>
        </Row>
      </Container>
    );
  }
}

// export default Dashboard;

const mapStateToProps = state => ({
  dashboardComponent: getDashboardComponent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...dashboardActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
