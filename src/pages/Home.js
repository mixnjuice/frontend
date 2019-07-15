import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import TopRecipesDay from 'components/Home/TopRecipesDay';
import NewRecipes from 'components/Home/NewRecipes';
import FeaturedMixer from 'components/Home/FeaturedMixer';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <h1>Welcome to MixNJuice!</h1>
            <p style={{ fontSize: '0.8em' }}>
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
