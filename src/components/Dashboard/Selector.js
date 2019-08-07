import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Flavors, Home, Migrations, Roles, Users } from './';

export default class Selector extends Component {
  static propTypes = {
    component: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
  }
  display() {
    const { component } = this.props;

    switch (component) {
      case 'Flavors':
        return <Flavors />;
      case 'Migrations':
        return <Migrations />;
      case 'Roles':
        return <Roles />;
      case 'Users':
        return <Users />;
      case 'Home':
      default:
        return <Home />;
    }
  }
  render() {
    return <Fragment>{this.display()}</Fragment>;
  }
}
