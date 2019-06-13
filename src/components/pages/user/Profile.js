import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from '@reach/router';

import { Container, Row, Col } from 'react-bootstrap';

export class Profile extends Component {
  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <p>
              This is what other users see when they look at your profile.
              <br />
              <Link to="/userSettings">Click here to edit your profile</Link>
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h1>xXTeddyBearSlayer69Xx</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(Profile);
