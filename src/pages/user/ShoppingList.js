import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export default function ShoppingList() {
  return (
    <Container>
      <Helmet title="Shopping List" />
      <h1>Shopping List</h1>
    </Container>
  );
}
