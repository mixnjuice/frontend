import { Helmet } from 'react-helmet';
import React from 'react';
import { Container } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container>
      <Helmet title="Not Found"></Helmet>
      <h1>Not Found</h1>
      <p>You requested a resource which could not be located.</p>
    </Container>
  );
}
