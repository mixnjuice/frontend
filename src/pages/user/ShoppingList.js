import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class ShoppingList extends Component {
  render() {
    return (
      <Container>
        <Helmet title="Shopping List" />
        <h1>Shopping List</h1>
      </Container>
    );
  }
}
