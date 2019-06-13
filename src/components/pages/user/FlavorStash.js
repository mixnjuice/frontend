import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

export class FlavorStash extends Component {
  render() {
    return (
      <Container>
        <h1>User Flavor Stash</h1>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(FlavorStash);
