import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import React, { Component } from 'react';

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
  Alert,
  Card
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import flavorStash from '../data/flavorstash.json';
import recipes from '../data/recipes.json';

export default class Recipe extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  constructor(...args) {
    super(...args);

    this.state = {
      flavors: [],
      favorited: false,
      favoriteIcon: ['far', 'heart'],
      alertClass: 'recipe-alert alert-hidden',
      rating: 0
    };

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleRatingClick = this.handleRatingClick.bind(this);
    this.renderRatingButtons = this.renderRatingButtons.bind(this);
  }

  componentDidMount() {
    this.findRecipe();
    this.compareWithStash();
  }

  handleFavoriteClick() {
    if (this.state.favorited) {
      this.setState({
        favorited: false,
        favoriteIcon: ['far', 'heart'],
        alertClass: 'recipe-alert alert-fade-in'
      });
    } else {
      this.setState({
        favorited: true,
        favoriteIcon: ['fas', 'heart'],
        alertClass: 'recipe-alert alert-fade-in'
      });
    }

    setTimeout(() => {
      this.setState({ alertClass: 'recipe-alert alert-fade-out alert-hidden' });
    }, 2500);
  }

  handleRatingClick(ratingNumber) {
    if (ratingNumber === this.state.rating) {
      this.setState({ rating: 0 });
    } else {
      this.setState({
        rating: ratingNumber
      });
    }
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

    if (recipe.notes) {
      const newNotes = recipe.notes.split('\n').map((line, i) => {
        return <p key={i}>{line}</p>;
      });

      recipe.notes = newNotes;
    }

    const newTags = recipe.tags.map((tag, i) => {
      return (
        <a className="link--tags" key={i} href="/">
          {tag}
        </a>
      );
    });

    recipe.tags = newTags;

    this.setState(recipe);
  }

  compareWithStash() {
    // eslint-disable-next-line
    console.log(this.state);
    const query = this.props.location.search;
    const queryValues = queryString.parse(query);
    const pageId = parseFloat(queryValues.id);

    const recipe = recipes.filter(e => e.id === pageId)[0];

    let index = 0;

    recipe.flavors.forEach(recipeFlavor => {
      let stashIndex = 0;

      flavorStash.forEach(stashFlavor => {
        if (recipeFlavor.id === stashFlavor.id) {
          recipe.flavors[index].inStash = true;
          return;
        }

        stashIndex++;
        if (stashIndex === flavorStash.length) {
          recipe.flavors[index].inStash = false;
          return;
        }
      });

      index++;
    });

    this.setState(recipe);
  }

  renderRatingButtons(ratingNum) {
    const buttons = [];

    let ratingKey = 1;

    for (let i = 0; i < ratingNum; i++) {
      buttons.push(
        <Button
          className="rating-button button--recipe"
          key={i + 1}
          onClick={() => this.handleRatingClick(i + 1)}
        >
          <span>
            <FontAwesomeIcon icon={['fas', 'star']} />
          </span>
        </Button>
      );
      ratingKey++;
    }

    for (let a = ratingNum; a < 5; a++) {
      buttons.push(
        <Button
          className="rating-button button--recipe"
          key={a + 1}
          onClick={() => this.handleRatingClick(a + 1)}
        >
          <span>
            <FontAwesomeIcon icon={['far', 'star']} />
          </span>
        </Button>
      );
      ratingKey++;
    }

    if (ratingKey === 6) {
      return <ButtonGroup>{buttons}</ButtonGroup>;
    }
  }

  render() {
    return (
      <Container className="text-center container--recipe">
        <Helmet title="Recipe" />
        <Row className="justify-content-center">
          <Alert variant="success" className={this.state.alertClass}>
            {this.state.favorited ? (
              <span>Recipe added to your favorites</span>
            ) : (
              <span>Recipe removed from your favorites</span>
            )}
          </Alert>
          <Col xs="auto">
            <Button className="button-animation button--recipe">
              <span>Make this recipe</span>
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              onClick={this.handleFavoriteClick}
              className="button--favorite button--recipe"
            >
              <span>
                <FontAwesomeIcon icon={this.state.favoriteIcon} />
              </span>
            </Button>
          </Col>
          <Col xs="auto">{this.renderRatingButtons(this.state.rating)}</Col>
        </Row>
        <hr />
        <Row>
          <Col lg={{ span: 8, offset: 2 }} xs={{ span: 12 }}>
            <Card className="text-center">
              <Card.Header>{this.state.name}</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={{ span: 5 }} xs={{ span: 12 }}>
                    <img
                      src="/media/card-test-1.jpg"
                      alt="card test"
                      className="w-75"
                    />
                  </Col>
                  <Col md={{ span: 7 }} xs={{ span: 12 }}>
                    <Card.Title>Version {this.state.version}</Card.Title>
                    <Card.Title>Notes</Card.Title>
                    <Card.Text>
                      {this.state.notes ? (
                        <div>{this.state.notes}</div>
                      ) : (
                        <div>
                          This user did not enter any notes for this recipe.
                        </div>
                      )}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">
                <span>
                  Created by{' '}
                  <a href={'/user?id=' + this.state.userId}>
                    {this.state.user}
                  </a>{' '}
                  on {this.state.date}
                </span>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} xs={{ span: 12 }}>
            <Table striped bordered>
              <caption className="text-center">
                {this.state.maxvg ? (
                  <span>Max VG |&nbsp;</span>
                ) : (
                  <span>
                    {this.state.pg}% PG / {this.state.vg}% VG |&nbsp;
                  </span>
                )}
                {this.state.shakeNVape ? (
                  <span>Shake & Vape |&nbsp;</span>
                ) : (
                  <span>Steep for {this.state.steepTime} days |&nbsp;</span>
                )}
                <span>Flavor total: {this.state.flavorTotal}%</span>
              </caption>
              <thead>
                <tr>
                  <th>Flavor</th>
                  <th>Percent</th>
                  <th>Stash</th>
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
                    <td>
                      {flavor.inStash ? (
                        <FontAwesomeIcon icon={['far', 'check-square']} />
                      ) : (
                        <FontAwesomeIcon icon={['far', 'square']} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} xs={{ span: 12 }}>
            <h3>Tags:</h3>
            <div className="d-flex justify-content-center flex-wrap">
              {this.state.tags}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
