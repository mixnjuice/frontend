import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from '@reach/router';

import { Container, Row, Col } from 'react-bootstrap';

import TopRecipesDay from '../templates/TopRecipesDay';
import NewRecipes from '../templates/NewRecipes';
import FeaturedMixer from '../templates/FeaturedMixer';

export class Home extends Component {
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

export default connect(
  null,
  null
)(Home);
