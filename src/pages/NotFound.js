import React, { Component, Fragment } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <h1>Not Found</h1>
        <p>You requested a resource which could not be located.</p>
      </Fragment>
    );
  }
}
