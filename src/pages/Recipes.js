import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions } from 'reducers/application';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Badge,
  Accordion
} from 'react-bootstrap';

import recipeList from '../data/generatedRecipes.json';
import flavorStash from '../data/flavorstash.json';

export class Recipes extends Component {
  static propTypes = {
    appActions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      recipes: {},
      grid: true
    };

    this.renderResultCards = this.renderResultCards.bind(this);
  }

  handleFavoriteClick(recipeId, recipeName) {
    // Most of this is just placeholder to show proof of concept...
    // Whether or not a recipe is favorited depends on the user
    // so this will be changed once a user db is in place
    const { appActions } = this.props;

    let recipeSettings = {};

    if (!this.state.recipes[recipeId]) {
      recipeSettings = {
        favorited: false,
        favoriteIcon: ['far', 'heart']
      };
    } else {
      recipeSettings = {
        favorited: this.state.recipes[recipeId].favorited,
        favoriteIcon: this.state.recipes[recipeId].favoriteIcon
      };
    }

    recipeSettings.favorited = !recipeSettings.favorited;
    if (recipeSettings.favorited) {
      recipeSettings.favoriteIcon = ['fas', 'heart'];
      appActions.popToast({
        title: 'Success!',
        icon: null,
        message: `${recipeName} has been added to your favorites`
      });
    } else {
      recipeSettings.favoriteIcon = ['far', 'heart'];
      appActions.popToast({
        title: 'Success!',
        icon: null,
        message: `${recipeName} has been removed from your favorites`
      });
    }

    this.setState({
      recipes: {
        ...this.state.recipes,
        [recipeId]: recipeSettings
      }
    });
  }

  handleViewToggle() {
    this.setState({ grid: !this.state.grid });
  }

  get renderAdvancedSearch() {
    const fields = ['Name', 'Author', 'Tags', 'Flavors'];

    return fields.map((field, index) => {
      return (
        <InputGroup className="py-1" key={`${field}${index}`}>
          <InputGroup.Prepend>
            <InputGroup.Text>{field}</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl />
        </InputGroup>
      );
    });
  }

  get renderResultCardsList() {
    return recipeList.map((recipe, index) => {
      if (index > 49) {
        return;
      }

      const image = '/media/card-test-1.jpg';

      return (
        <Row key={`${recipe.id}${index}`} className="py-1">
          <Col>
            <Card>
              <Card.Header className="search-list--card-header">
                <a href={'/recipe?id=' + recipe.id}>{recipe.name}</a>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col lg="1">
                    <img
                      src={image}
                      alt={recipe.name}
                      className="w-100 border border-dark rounded-lg"
                    />
                  </Col>
                  <Col lg="11">
                    <Card.Text>
                      <span className="font-weight-bold">Tags:</span>
                      {recipe.tags.map((tag, i) => {
                        return (
                          <a className="link--tags" key={`${tag}${i}`} href="/">
                            {tag}
                          </a>
                        );
                      })}
                    </Card.Text>
                    <Card.Text>
                      <span className="font-weight-bold">Notes:&nbsp;</span>
                      {recipe.notes.substring(0, 300)}...
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <span className="mx-2">
                  <a href="/">{recipe.user}</a>
                </span>
                <Button className="mx-2 button-animation">
                  <span>Create</span>
                </Button>
                <Button
                  className="mx-2 button--favorite"
                  onClick={() =>
                    this.handleFavoriteClick(recipe.id, recipe.name)
                  }
                >
                  <span>
                    <FontAwesomeIcon
                      icon={
                        this.state.recipes[recipe.id]
                          ? this.state.recipes[recipe.id].favoriteIcon
                          : ['far', 'heart']
                      }
                    />
                  </span>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      );
    });
  }

  get renderResultCardsGrid() {
    return recipeList.map((recipe, index) => {
      if (index > 49) {
        return;
      }

      const comparison = [];

      const choosingIcon = {
        has: 0,
        hasNot: 0
      };

      let comparisonIcon = {};

      recipe.flavors.map(recipeFlavor => {
        for (let i = 0; i < flavorStash.length; i++) {
          if (flavorStash[i].id === recipeFlavor.id) {
            comparison.push({
              id: recipeFlavor.id,
              name: `${recipeFlavor.abbreviation} ${recipeFlavor.name}`,
              inStash: true
            });
            break;
          }

          if (i === flavorStash.length - 1) {
            comparison.push({
              id: recipeFlavor.id,
              name: `${recipeFlavor.abbreviation} ${recipeFlavor.name}`,
              inStash: false
            });
          }
        }
      });

      for (let i = 0; i < comparison.length; i++) {
        if (comparison[i].inStash) {
          choosingIcon.has++;
        } else {
          choosingIcon.hasNot++;
        }
        // Tried this ternary but ESLint throws the error:
        // Expected an assignment or function call and instead saw an expression.eslint(no-unused-expressions)
        // comparison[i].inStash ? choosingIcon.has++ : choosingIcon.hasNot++;
      }

      if (choosingIcon.has > 0 && choosingIcon.hasNot > 0) {
        comparisonIcon = {
          icon: ['fas', 'minus-circle'],
          class: 'search-icon--minus'
        };
      } else if (choosingIcon.has > 0 && choosingIcon.hasNot === 0) {
        comparisonIcon = {
          icon: ['fas', 'check-circle'],
          class: 'search-icon--check'
        };
      } else {
        comparisonIcon = {
          icon: ['fas', 'times-circle'],
          class: 'search-icon--times'
        };
      }

      const image = '/media/card-test-5.jpeg';

      return (
        <Col
          key={`${recipe.id}${index}`}
          xs="12"
          md="6"
          lg="3"
          className="mx-auto px-0"
        >
          <Card className="search-grid--card">
            <Card.Img
              className="card-img search-grid--card-image"
              src={image}
              alt={recipe.name}
            />
            <Card.ImgOverlay className="p-3">
              <Card.Title className="search-grid--card-header text-center">
                <a href={'/recipe?id=' + recipe.id}>{recipe.name}</a>
              </Card.Title>
              <Card.Body className="p-0">
                <Card.Text>
                  <span className="font-weight-bold">Author:</span>
                  <a href="/">
                    <Badge className="link--tags">{recipe.user}</Badge>
                  </a>
                </Card.Text>
                <Card.Text className="search-grid--card-text tags">
                  <span className="font-weight-bold">Tags:</span>
                  {recipe.tags.map((tag, i) => {
                    if (i < 6) {
                      return (
                        <a key={`${tag}${i}`} href="/">
                          <Badge className="link--tags mx-1">{tag}</Badge>
                        </a>
                      );
                    } else if (i === 6) {
                      return (
                        <a key={`${tag}${i}`} href="/">
                          <Badge className="link--tags mx-1">and more...</Badge>
                        </a>
                      );
                    } else {
                      return;
                    }
                  })}
                </Card.Text>
                <Card.Text>
                  <Button className="mx-2 button-animation">
                    <span>Create</span>
                  </Button>
                  <Button
                    className="mx-2 button--favorite"
                    onClick={() =>
                      this.handleFavoriteClick(recipe.id, recipe.name)
                    }
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={
                          this.state.recipes[recipe.id]
                            ? this.state.recipes[recipe.id].favoriteIcon
                            : ['far', 'heart']
                        }
                      />
                    </span>
                  </Button>
                  <Button className="mx-2 button--favorite button--stash-check">
                    <FontAwesomeIcon
                      icon={comparisonIcon.icon}
                      className={comparisonIcon.class}
                    />
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card.ImgOverlay>
          </Card>
        </Col>
      );
    });
  }

  renderResultCards() {
    const image = '/media/card-test-5.jpeg';

    return recipeList.map((recipe, index) => {
      return (
        <Col key={`${recipe.id}${index}`} lg={this.state.grid ? 3 : 12}>
          <Card className="search-grid--card">
            <Card.Img
              className="card-img search-grid--card-image"
              src={image}
              alt={recipe.name}
            />
            <Card.Title
              className={
                this.state.grid
                  ? 'search-grid--card-header'
                  : 'search-list--card-header'
              }
            >
              <a href={'/recipe?id=' + recipe.id}>{recipe.name}</a>
            </Card.Title>
            <Card.Body className={this.state.grid ? 'py-0' : null}>
              <Card.Text>
                <span className="font-weight-bold">Author:</span>
                <a href="/">
                  <Badge className="link--tags">{recipe.user}</Badge>
                </a>
              </Card.Text>
              <Card.Text
                className={
                  this.state.grid ? 'search-grid--card-text tags' : null
                }
              >
                <span className="font-weight-bold">Tags:</span>
                {recipe.tags.map((tag, i) => {
                  if (i < 6) {
                    return (
                      <a key={`${tag}${i}`} href="/">
                        <Badge className="link--tags mx-1">{tag}</Badge>
                      </a>
                    );
                  } else if (i === 6) {
                    return (
                      <a key={`${tag}${i}`} href="/">
                        <Badge className="link--tags mx-1">and more...</Badge>
                      </a>
                    );
                  } else {
                    return;
                  }
                })}
              </Card.Text>
              <Card.Text>
                <Button className="mx-2 button-animation">
                  <span>Create</span>
                </Button>
                <Button
                  className="mx-2 button--favorite"
                  onClick={() =>
                    this.handleFavoriteClick(recipe.id, recipe.name)
                  }
                >
                  <span>
                    <FontAwesomeIcon
                      icon={
                        this.state.recipes[recipe.id]
                          ? this.state.recipes[recipe.id].favoriteIcon
                          : ['far', 'heart']
                      }
                    />
                  </span>
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
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
              <span className="my-auto ml-3 mr-1 font-weight-bold">List</span>
              <label className="switch my-auto mx-1">
                <input
                  type="checkbox"
                  checked={this.state.grid}
                  onChange={() => {
                    this.handleViewToggle();
                  }}
                />
                <span className="slider round"></span>
              </label>
              <span className="my-auto mx-1 font-weight-bold">Grid</span>
            </InputGroup>
          </Col>
        </Row>
        <Row className="text-center py-1">
          <Col lg={{ span: 6, offset: 3 }}>
            <Accordion>
              <Accordion.Toggle as="a" eventKey="0" href="#">
                <h3 className="font-weight-bold">Advanced Search</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div className="m-0 p-0">
                  <div className="search-accordion">
                    {this.renderAdvancedSearch}
                  </div>
                </div>
              </Accordion.Collapse>
            </Accordion>
          </Col>
        </Row>
        {/* <Row>{this.renderResultCards()}</Row> */}
        <Row>
          {this.state.grid
            ? this.renderResultCardsGrid
            : this.renderResultCardsList}
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Recipes);
