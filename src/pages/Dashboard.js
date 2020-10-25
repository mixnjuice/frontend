import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import {
  DashboardMenu as Menu,
  DashboardMain as Main
} from 'components/Dashboard';
import { Container, Row, Col } from 'react-bootstrap';

import { actions as dashboardActions } from 'reducers/dashboard';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardActions.requestStats());
  }, [dispatch]);

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
