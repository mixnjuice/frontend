import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Col } from 'react-bootstrap';

export class NotFound extends Component {
  render() {
    return (
      <Col sm={6}>
        <h1>ERROR 404:</h1>
        <div>Page was not found</div>
      </Col>
    );
  }
}

export default connect(
  null,
  null
)(NotFound);
