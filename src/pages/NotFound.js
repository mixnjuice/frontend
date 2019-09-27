import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <Helmet title="Not Found"></Helmet>
        <h1>Not Found</h1>
        <p>You requested a resource which could not be located.</p>
      </Fragment>
    );
  }
}
