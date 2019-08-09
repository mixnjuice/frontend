import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import DashMenu from 'components/Dashboard/Menu';
import DashMain from 'components/Dashboard/Main';
import { Container, Row, Col } from 'react-bootstrap';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

export class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <DashMenu />
          </Col>
          <Col xs={12} md={9}>
            <DashMain />
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
