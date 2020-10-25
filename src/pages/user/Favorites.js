import { Helmet } from 'react-helmet';
import React from 'react';
import { Container } from 'react-bootstrap';

export default function Favorites() {
  return (
    <Container>
      <Helmet title="Your Favorites" />
      <h1>User Favorites</h1>
    </Container>
  );
}
