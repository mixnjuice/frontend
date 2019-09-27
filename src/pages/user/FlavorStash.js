import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class FlavorStash extends Component {
  render() {
    return (
      <Container>
        <Helmet title="Your Flavor Stash" />
        <h1>User Flavor Stash</h1>
      </Container>
    );
  }
}
