import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <Jumbotron>
          <h1>
            <FontAwesomeIcon icon="exclamation-triangle" /> Something went
            wrong. Please refresh the page.
          </h1>
        </Jumbotron>
      );
    }

    return this.props.children;
  }
}
