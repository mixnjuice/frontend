import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from '@reach/router';

import TopRecipesDay from 'components/templates/TopRecipesDay';
import NewRecipes from 'components/templates/NewRecipes';
import FeaturedMixer from 'components/templates/FeaturedMixer';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>Welcome to MixNJuice!</h1>
            <p style={{ 'font-size': '0.8em' }}>
              <Link to="#">Click here to customize your front page!</Link>
            </p>
          </Col>
        </Row>
        <TopRecipesDay />
        <hr />
        <NewRecipes />
        <hr />
        <FeaturedMixer />
      </Container>
    );
  }
}
