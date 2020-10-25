import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function UserRecipes() {
  const listItems = [];

  for (let i = 0; i < 20; i++) {
    listItems.push(
      <tr key={i}>
        <td>
          <Link to="#">Recipe {i}</Link>
        </td>
      </tr>
    );
  }

  return (
    <Container className="text-center">
      <Helmet title="Recipes" />
      <Row>
        <Col>
          <h1>Your Original Recipes</h1>
          <Table striped bordered>
            <tbody>{listItems}</tbody>
          </Table>
        </Col>
        <Col>
          <h1>Your Adapted Recipes</h1>
          <Table striped bordered>
            <tbody>{listItems}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
