import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';

import ToggleButton from 'components/ToggleButton/ToggleButton';
import { actions as flavorActions } from 'reducers/flavor';
import { actions as flavorsActions } from 'reducers/flavors';
import { isLoggedIn } from 'selectors/application';
import { getStash, isLoaded as isStashLoaded } from 'selectors/flavor';
import { getCollection, isLoaded as areFlavorsLoaded } from 'selectors/flavors';
import debounce from 'lodash.debounce';

function StashIcon({ id, has, onAdd, onRemove }) {
  return (
    <ToggleButton
      testId={`stash-icon-${id}`}
      value={has}
      onClick={() => (has ? onRemove(id) : onAdd(id))}
      title={has ? 'Remove from Stash' : 'Add to Stash'}
      variant="check"
    />
  );
}

StashIcon.propTypes = {
  id: PropTypes.string.isRequired,
  has: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default function Flavors() {
  const dispatch = useDispatch();

  const flavors = useSelector(getCollection);
  const flavorsLoaded = useSelector(areFlavorsLoaded);
  const loggedIn = useSelector(isLoggedIn);
  const stash = useSelector(getStash);
  const stashLoaded = useSelector(isStashLoaded);

  const [filter, setFilter] = useState('');
  const debouncedSetFilter = debounce((value) => {
    setFilter(value);

    if (value.length >= 3) {
      dispatch(flavorsActions.requestFlavors(value));
    }
  }, 250);
  const [holdings, setHoldings] = useState({});

  useEffect(() => {
    if (loggedIn && !stashLoaded) {
      dispatch(flavorActions.requestStash());
    } else if (loggedIn) {
      setHoldings(
        stash.reduce((acc, flavor) => ({ ...acc, [flavor.flavorId]: true }), {})
      );
    }
  }, [dispatch, loggedIn, stashLoaded, flavors, setHoldings, stash, filter]);

  const handleFilterChange = useCallback(
    (event) => {
      const {
        target: { value }
      } = event;

      debouncedSetFilter(value);
    },
    [debouncedSetFilter]
  );

  const handleAddToStash = useCallback(
    (id) => {
      dispatch(flavorActions.addStash({ id }));

      setHoldings((s) => ({
        ...s,
        [id]: true
      }));
    },
    [dispatch, setHoldings]
  );

  const handleRemoveFromStash = useCallback(
    (id) => {
      dispatch(flavorActions.removeStash({ id }));

      setHoldings((s) => ({
        ...s,
        [id]: false
      }));
    },
    [dispatch, setHoldings]
  );

  const FlavorItem = ({ index, style }) => {
    const flavor = flavors[index];
    const inStash = holdings[flavor.id] === true;

    return (
      <Row style={style}>
        <Col className="text-center">
          <StashIcon
            id={flavor.id}
            has={inStash}
            onAdd={handleAddToStash}
            onRemove={handleRemoveFromStash}
          />
        </Col>
        <Col>{flavor.Vendor.name}</Col>
        <Col>{flavor.name}</Col>
        <Col>{flavor.slug}</Col>
        <Col className="text-right">{flavor.density} g/mL</Col>
      </Row>
    );
  };

  FlavorItem.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  return (
    <Container>
      <Helmet title="Flavors" />
      <Container fluid>
        <Row className="text-center">
          <Col>
            <h1>Flavors</h1>
          </Col>
        </Row>
        <Row>
          <FormControl type="text" onChange={handleFilterChange} />
        </Row>
      </Container>
      {flavorsLoaded && (
        <List height={600} itemSize={40} itemCount={flavors?.length}>
          {FlavorItem}
        </List>
      )}
    </Container>
  );
}
