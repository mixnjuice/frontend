import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card
} from 'react-bootstrap';

import recipes from '../data/generatedRecipes.json';

export default class Recipes extends Component {
  constructor(props) {
    super(props);

    this.renderResultCards = this.renderResultCards.bind(this);
  }

  renderResultCards() {
    return recipes.map((recipe, index) => {
      const imageNum = Math.floor(Math.random() * 3 + 1);

      const image = '/media/card-test-' + imageNum + '.jpg';

      return (
        <Row key={index} className="py-1">
          <Col>
            <Card>
              <Card.Header key={index} className="search-card-header">
                <a href={'/recipe?id=' + recipe.id}>{recipe.name}</a>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col lg="1">
                    <img src={image} alt={recipe.name} className="w-100" />
                  </Col>
                  <Col lg="auto">
                    <Card.Text>
                      Tags:
                      {recipe.tags.map((tag, i) => {
                        return (
                          <a className="link--tags" key={i} href="/">
                            {tag}
                          </a>
                        );
                      })}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <span className="px-2">{recipe.user}</span>
                <Button className="button-animation">
                  <span>Create</span>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col lg={{ span: 6, offset: 3 }}>
            <InputGroup>
              <FormControl />
              <InputGroup.Append>
                <Button className="button-animation">
                  <span>Search</span>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h4>Advanced Search Dropdown</h4>
          </Col>
        </Row>
        {this.renderResultCards()}
      </Container>
    );
  }
}
