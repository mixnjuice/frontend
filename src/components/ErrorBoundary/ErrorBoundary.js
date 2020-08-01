import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="text-center">
          <h1>Something went wrong. Please refresh the page.</h1>
        </Container>
      );
    }

    return this.props.children;
  }
}
