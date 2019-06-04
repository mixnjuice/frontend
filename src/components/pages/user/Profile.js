import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Col } from 'react-bootstrap';

export class Profile extends Component {
  render() {
    return (
      <Col sm={6}>
        <h1>User Profile</h1>
      </Col>
    );
  }
}

export default connect(
  null,
  null
)(Profile);
