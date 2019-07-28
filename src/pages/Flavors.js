import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import FlavorData from '../data/flavors.json';

export default class Flavors extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      amount: '0',
      strength: '0',
      data: FlavorData
    };
  }

  handleUserInput(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { data } = this.state;

    return (
      <Container>
        <Helmet title="Flavors" />
        {data.map((flavor, index) => (
          <div key={index}>
            {flavor.vendor.abbreviation} {flavor.name}
          </div>
        ))}
      </Container>
    );
  }
}
