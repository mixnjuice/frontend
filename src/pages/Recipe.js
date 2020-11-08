import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import React, { Component } from 'react';
import { actions } from 'reducers/application';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ImageOne from 'media/card-test-1.jpg';
import recipes from '../data/recipes.json';
import flavorStash from '../data/flavorstash.json';
import RecipeDetails from 'components/RecipeDetails/RecipeDetails';

export class Recipe extends Component {
  static propTypes = {
    appActions: PropTypes.object.isRequired,
    location: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      flavors: [],
      favorited: false,
      favoriteIcon: ['far', 'heart'],
      maxVG: false,
      percentVG: 50,
      shakeAndVape: false,
      steepDays: 0,
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
    const { appActions } = this.props;

    if (this.state.favorited) {
      this.setState({
        favorited: false,
        favoriteIcon: ['far', 'heart']
      });

      appActions.popToast({
        title: 'Success!',
        icon: null,
        message: 'This recipe has been removed from your favorites'
      });
    } else {
      this.setState({
        favorited: true,
        favoriteIcon: ['fas', 'heart']
      });

      appActions.popToast({
        title: 'Success!',
        icon: null,
        message: 'This recipe has been added your favorites'
      });
    }
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
    const query = this.props.location?.search;
    const queryValues = queryString.parse(query);
    const pageId = parseFloat(queryValues.id);

    const recipe = recipes.filter((e) => e.id === pageId)[0];

    recipe.flavorTotal = 0;
    recipe.flavors.forEach((flavor) => {
      recipe.flavorTotal += flavor.percent;
    });

    if (recipe.notes) {
      const newNotes = recipe.notes
        .toString()
        .split('\n')
        .map((line, i) => {
          return <Card.Text key={`${recipe.id}${i}`}>{line}</Card.Text>;
        });

      recipe.notes = newNotes;
    }

    const newTags = recipe.tags.map((tag, i) => {
      return (
        <a key={`${recipe.id}${i}`} href="/">
          <Badge className="link--tags">{tag}</Badge>
        </a>
      );
    });

    recipe.tags = newTags;

    this.setState(recipe);
  }

  compareWithStash() {
    const query = this.props.location?.search;
    const queryValues = queryString.parse(query);
    const pageId = parseFloat(queryValues.id);

    const recipe = recipes?.filter?.((e) => e.id === pageId)[0];

    let index = 0;

    recipe.flavors.forEach((recipeFlavor) => {
      let stashIndex = 0;

      flavorStash.forEach((stashFlavor) => {
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

    for (let i = 0; i < 5; i++) {
      buttons.push(
        <Button
          className="rating-button button--recipe"
          key={i}
          onClick={() => this.handleRatingClick(i + 1)}
        >
          <span>
            {i < ratingNum ? (
              <FontAwesomeIcon icon={['fas', 'star']} />
            ) : (
              <FontAwesomeIcon icon={['far', 'star']} />
            )}
          </span>
        </Button>
      );
    }

    return <ButtonGroup>{buttons}</ButtonGroup>;
  }

  render() {
    const {
      favoriteIcon,
      rating,
      name,
      version,
      notes,
      userId,
      user,
      date,
      maxVG,
      percentVG,
      shakeAndVape,
      steepDays,
      flavors,
      tags
    } = this.state;

    return (
      <Container className="text-center container--recipe">
        <Helmet title="Recipe" />
        <Row className="justify-content-center">
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
                <FontAwesomeIcon icon={favoriteIcon} />
              </span>
            </Button>
          </Col>
          <Col xs="auto">{this.renderRatingButtons(rating)}</Col>
        </Row>
        <hr />
        <Row>
          <Col lg={{ span: 8, offset: 2 }} xs={{ span: 12 }}>
            <Card className="text-center">
              <Card.Header>{name}</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={{ span: 5 }} xs={{ span: 12 }}>
                    <img src={ImageOne} alt="card test" className="w-75" />
                  </Col>
                  <Col md={{ span: 7 }} xs={{ span: 12 }}>
                    <Card.Title>Version {version}</Card.Title>
                    <Card.Title>Notes</Card.Title>
                    {notes ? (
                      <div>{notes}</div>
                    ) : (
                      <div>
                        This user did not enter any notes for this recipe.
                      </div>
                    )}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">
                <span>
                  Created by <a href={'/user?id=' + userId}>{user}</a> on {date}
                </span>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} xs={{ span: 12 }}>
            <RecipeDetails
              maxVg={maxVG}
              percentVg={percentVG}
              shakeAndVape={shakeAndVape}
              steepDays={steepDays}
              flavors={flavors}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} xs={{ span: 12 }}>
            <h3>Tags:</h3>
            <div className="d-flex justify-content-center flex-wrap">
              {tags}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(Recipe);
