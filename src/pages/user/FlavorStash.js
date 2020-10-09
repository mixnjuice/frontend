import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { getStash, isLoaded } from 'selectors/flavor';
import { actions as flavorActions } from 'reducers/flavor';

export default function FlavorStash() {
  const dispatch = useDispatch();
  const stash = useSelector(getStash);
  const stashLoaded = useSelector(isLoaded);

  useEffect(() => {
    if (!stashLoaded) {
      dispatch(flavorActions.requestStash());
    }
  }, [stashLoaded, dispatch]);

  const hasStash = Array.isArray(stash) && stash.length;

  return (
    <Container>
      <Helmet title="User Flavor Stash" />
      <Table striped hover>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Flavor</th>
            <th>Added</th>
          </tr>
        </thead>
        <tbody>
          {hasStash ? (
            stash.map((flavor, index) => (
              <tr key={index}>
                <td>{flavor?.Flavor?.Vendor?.code}</td>
                <td>{flavor?.Flavor.name}</td>
                <td>{dayjs(flavor?.created).format('YYYY-MM-DD')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No flavors in stash.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
