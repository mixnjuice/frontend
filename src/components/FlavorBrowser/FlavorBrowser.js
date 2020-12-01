import classNames from 'classnames';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, InputGroup, Form, Row, Col } from 'react-bootstrap';

import { getStash, isLoaded } from 'selectors/flavor';
import { actions as recipeActions } from 'reducers/recipe';
import { actions as flavorActions } from 'reducers/flavor';
import { getActiveRecipe } from 'selectors/recipe';

export default function FlavorBrowser() {
  const baseClass = 'flavor-browser';
  const dispatch = useDispatch();
  const stash = useSelector(getStash);
  const stashLoaded = useSelector(isLoaded);
  const recipe = useSelector(getActiveRecipe);
  const [searchStash, setSearchStash] = useState('');
  const debouncedSetSearchStash = debounce(setSearchStash, 250);
  const addIngredient = useCallback(
    (name) => {
      const { ingredients, percentages } = recipe;

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

      dispatch(recipeActions.setRecipeIngredients([...ingredients, toAdd]));
      dispatch(
        recipeActions.setRecipePercentages({ ...percentages, [toAdd.id]: 0 })
      );
    },
    [dispatch, recipe, stashLoaded, stash]
  );

  const handleSearchChange = (event) => {
    const {
      target: { value }
    } = event;

    debouncedSetSearchStash(value);
  };

  useEffect(() => {
    if (!stashLoaded) {
      dispatch(flavorActions.requestStash());
    }
  }, [stashLoaded, dispatch]);

  let filteredStash = [];

  if (Array.isArray(stash) && stash.length) {
    filteredStash = stash.filter((flavor) => {
      const {
        Flavor: {
          Vendor: { code: vendorCode, name: vendorName },
          name: flavorName
        }
      } = flavor;
      const stashSlug = `${vendorName} ${vendorCode} ${flavorName}`.toLowerCase();

      return stashSlug.includes(searchStash.toLowerCase());
    });
  }

  const FlavorBrowserItem = ({ index, style }) => {
    const {
      Flavor: { id, Vendor: vendor, name }
    } = filteredStash[index];
    const itemClass = `${baseClass}-item`;
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
            onClick={() => addIngredient(id)}
          >
            <FontAwesomeIcon icon="plus" size="xs" title="add" />
          </Button>
        </Col>
      </Row>
    );
  };

  FlavorBrowserItem.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object
  };

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
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form.Group>
      <Col
        md="12"
        className={classNames(baseClass, 'border-bottom', 'border-top', 'pr-0')}
      >
        {filteredStash.length > 0 ? (
          <List height={200} itemSize={30} itemCount={filteredStash.length}>
            {FlavorBrowserItem}
          </List>
        ) : (
          <p>No results!</p>
        )}
      </Col>
    </Fragment>
  );
}
