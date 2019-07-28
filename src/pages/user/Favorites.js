import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Favorites extends Component {
  render() {
    return (
      <Container>
        <Helmet title="Your Favorites" />
        <h1>User Favorites</h1>
      </Container>
    );
  }
}
