import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FlavorData from 'data/flavors';

export default class Flavors extends Component {
  render() {
    return (
      <Container>
        <Helmet title="Flavors" />
        <Table striped hover>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Flavor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {FlavorData.map((flavor, index) => (
              <tr key={index}>
                <td>{flavor.vendor.abbreviation}</td>
                <td>{flavor.name}</td>
                <td>
                  <FontAwesomeIcon icon="link" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
