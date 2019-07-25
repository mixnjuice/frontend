import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

import recipes from '../data/recipes.json';

export default class Recipe extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      flavors: []
    };
  }

  componentDidMount() {
    this.findRecipe();
  }

  findRecipe() {
    const query = this.props.location.search;
    const queryValues = queryString.parse(query);
    const pageId = parseFloat(queryValues.id);

    const recipe = recipes.filter(e => e.id === pageId)[0];

    recipe.flavorTotal = 0;
    recipe.flavors.forEach(flavor => {
      recipe.flavorTotal += flavor.percent;
    });

    this.setState(recipe);
  }

  render() {
    return (
      <Container className="text-center">
        <Helmet title="Recipe" />
        <Row>
          <Col md={{ span: 2, offset: 3 }}>
            <img
              src="/media/card-test-1.jpg"
              alt="card test"
              className="w-100 img-thumbnail"
            />
          </Col>
          <Col md={{ span: 4 }}>
            <h1 className="recipeTitle">{this.state.name}</h1>
            <h2>
              Created by{' '}
              <a href={'/user?id=' + this.state.userId}>{this.state.user}</a>
            </h2>
            <p>on {this.state.date}</p>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Flavor</th>
                  <th>Percent</th>
                </tr>
              </thead>
              <tbody>
                {this.state.flavors.map((flavor, index) => (
                  <tr key={index}>
                    <td>
                      <a href={'/flavor?id=' + flavor.id}>
                        {flavor.abbreviation} {flavor.name}
                      </a>
                    </td>
                    <td>{flavor.percent.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.maxvg && <h3>Max VG</h3>}
            {!this.state.maxvg && (
              <h3>
                {this.state.pg}% PG / {this.state.vg}% VG
              </h3>
            )}
            {this.state.shakeNVape && <h3>Shake & Vape</h3>}
            {!this.state.shakeNVape && (
              <h3>Steep for {this.state.steepTime} days</h3>
            )}
            <h3>Flavor total: {this.state.flavorTotal}%</h3>
          </Col>
        </Row>
        {this.state.notes && (
          <Row>
            <Col>
              <h2>Notes</h2>
              <p>{this.state.notes}</p>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

Recipe.propTypes = {
  location: PropTypes.object
};
