import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

export class User extends Component {
  render() {
    return (
      <Container>
        <h1>User Page</h1>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(User);
