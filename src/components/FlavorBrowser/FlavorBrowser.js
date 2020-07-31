import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import { FixedSizeList as List } from 'react-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, InputGroup, Form, Row, Col } from 'react-bootstrap';

import { getStash, isLoaded } from 'selectors/flavor';
import { actions as recipeActions } from 'reducers/recipe';
import { actions as flavorActions } from 'reducers/flavor';
import { getActiveRecipe } from 'selectors/recipe';

export class FlavorBrowser extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      requestStash: PropTypes.func.isRequired,
      setRecipeIngredients: PropTypes.func.isRequired,
      setRecipePercentages: PropTypes.func.isRequired
    }),
    stash: PropTypes.arrayOf(PropTypes.object),
    stashLoaded: PropTypes.bool,
    recipe: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      searchStash: ''
    };

    this.baseClass = 'flavor-browser';
    this.renderItem = this.renderItem.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.debouncedUpdate = debounce(this.debouncedUpdate.bind(this), 250);
  }

  componentDidMount() {
    const { stashLoaded, actions } = this.props;

    if (!stashLoaded) {
      actions.requestStash();
    }
  }

  addIngredient(name) {
    const {
      recipe: { ingredients, percentages },
      stashLoaded,
      actions,
      stash
    } = this.props;

    if (!stashLoaded) {
      return;
    }

    const existing = ingredients.find(
      (ingredient) => ingredient.Flavor.id === name
    );

    if (existing) {
      return;
    }

    const toAdd = stash.find((flavor) => flavor.Flavor.id === name);

    if (!toAdd) {
      return;
    }

    actions.setRecipeIngredients([...ingredients, toAdd]);
    actions.setRecipePercentages([...percentages, 0]);
  }

  handleSearchChange(event) {
    const {
      target: { value }
    } = event;

    this.debouncedUpdate({
      searchStash: value
    });
  }

  debouncedUpdate(state) {
    this.setState(state);
  }

  get filteredStash() {
    const { stash } = this.props;

    if (!Array.isArray(stash) || stash.length === 0) {
      return [];
    }

    return stash.filter((flavor) => {
      const {
        Flavor: {
          Vendor: { code: vendorCode, name: vendorName },
          name: flavorName
        }
      } = flavor;
      const stashSlug = `${vendorName} ${vendorCode} ${flavorName}`.toLowerCase();

      return stashSlug.includes(this.state.searchStash.toLowerCase());
    });
  }

  renderItem({ index, style }) {
    const {
      Flavor: { id, Vendor: vendor, name }
    } = this.filteredStash[index];
    const itemClass = `${this.baseClass}-item`;
    const vendorClass = `${itemClass}-vendor`;
    const stripeClass = index % 2 === 0 ? `${itemClass}--striped` : false;

    return (
      <Row
        className={classNames(itemClass, stripeClass)}
        // there is 16px of padding, offset by 15px to prevent overflow
        style={{ ...style, left: '15px' }}
      >
        <Col md="2" sm="3" className={vendorClass}>
          {vendor.code}
        </Col>
        <Col md="6" sm="7">
          {name}
        </Col>
        <Col md="4" sm="2">
          <Button
            size="sm"
            className="button-animation"
            onClick={() => this.addIngredient(id)}
          >
            <FontAwesomeIcon icon="plus" size="xs" title="add" />
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Fragment>
        <Form.Group as={Col} md="6" sm="9" controlId="searchStash">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon="search" title="search" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="searchStash"
              type="text"
              placeholder="Search stash..."
              onChange={this.handleSearchChange}
            />
          </InputGroup>
        </Form.Group>
        <Col
          md="12"
          className={classNames(
            this.baseClass,
            'border-bottom',
            'border-top',
            'pr-0'
          )}
        >
          {this.filteredStash.length > 0 ? (
            <List
              height={200}
              itemSize={30}
              itemCount={this.filteredStash.length}
            >
              {this.renderItem}
            </List>
          ) : (
            <p>No results!</p>
          )}
        </Col>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  stash: getStash(state),
  stashLoaded: isLoaded(state),
  recipe: getActiveRecipe(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...flavorActions,
      ...recipeActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(FlavorBrowser);
