import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

export default class UserRecipes extends Component {
  render() {
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
}
