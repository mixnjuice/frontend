import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { Col, Container, Row, Table } from 'react-bootstrap';
import ToggleButton from 'components/ToggleButton/ToggleButton';
import { actions as flavorActions } from 'reducers/flavor';
import { actions as flavorsActions } from 'reducers/flavors';
import { isLoggedIn } from 'selectors/application';
import { getStash, isLoaded } from 'selectors/flavor';
import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

function StashToggle({ value, onClick }) {
  return (
    <ToggleButton
      data-testid="stash-toggle"
      value={value}
      onClick={onClick}
      title={!value ? 'Enable Flavor Stash' : 'Disable Flavor Stash'}
      variant="switch"
    />
  );
}

StashToggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

function StashIcon({ id, has, onAdd, onRemove }) {
  return (
    <ToggleButton
      data-testid={`stash-icon-${id}`}
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

export function Flavors({ collection, pager, pagerNavigation }) {
  const dispatch = useDispatch();

  const loggedIn = useSelector(isLoggedIn);
  const stash = useSelector(getStash);
  const stashLoaded = useSelector(isLoaded);

  const [stashToggle, setStashToggle] = useState(false);
  const [holdings, setHoldings] = useState({});

  useEffect(() => {
    if (loggedIn && !stashLoaded) {
      dispatch(flavorActions.requestStash());
    }
  }, [dispatch, loggedIn, stashLoaded]);

  const handleStashToggle = useCallback(() => {
    if (Object.keys(holdings).length === 0) {
      setHoldings(
        stash.reduce((acc, flavor) => ({ ...acc, [flavor.flavorId]: true }), {})
      );
    }

    setStashToggle((s) => !s);
  }, [stash, holdings, setStashToggle]);

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
          <Col className="text-left ml-2 mb-4">
            {loggedIn ? (
              <>
                <StashToggle value={stashToggle} onClick={handleStashToggle} />{' '}
                <span>Enable Flavor Stash</span>
              </>
            ) : (
              <small>Log in to Enable Flavor Stash</small>
            )}
          </Col>
        </Row>
      </Container>
      {pagerNavigation}
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            {loggedIn && stashToggle && <th>Stash</th>}
            <th>ID</th>
            <th>Vendor</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Density</th>
          </tr>
        </thead>
        <tbody>
          {collection.map((flavor) => {
            return (
              <tr key={flavor.id}>
                {stashToggle && (
                  <td className="text-center">
                    <StashIcon
                      id={flavor.id}
                      has={holdings[flavor.id] === true}
                      onAdd={handleAddToStash}
                      onRemove={handleRemoveFromStash}
                    />
                  </td>
                )}
                <td className="text-center">{flavor.id}</td>
                <td>{flavor.Vendor.name}</td>
                <td>{flavor.name}</td>
                <td className="text-center">{flavor.slug}</td>
                <td className="text-center">{flavor.density}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pagerNavigation}
      <PagerInfo contentType="Flavors" pager={pager} />
    </Container>
  );
}

Flavors.propTypes = {
  collection: PropTypes.array.isRequired,
  pager: PropTypes.object.isRequired,
  pagerNavigation: PropTypes.node.isRequired
};

export default withPagination(
  flavorsActions.requestFlavors,
  getAllFlavors,
  getFlavorsPager
)(Flavors);
