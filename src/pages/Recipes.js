import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default class Recipes extends Component {
  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>Recipes search page</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
