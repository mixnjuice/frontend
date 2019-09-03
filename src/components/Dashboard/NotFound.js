import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DashboardLayout as Layout } from 'components/Dashboard/';

export class NotFound extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    opt: PropTypes.object
  };

  render() {
    const { name, opt } = this.props;

    return (
      <Layout pageTitle="Not Found" header="Not Found :(" options={opt}>
        <h3>Oops!</h3>
        I&apos;ve searched <i>long</i> and &quot;hard&quot;, yet I couldn&apos;t
        find a Dashboard Component identified as <strong>{name}</strong> in{' '}
        <code>components/Dashboard/Main.js</code>
      </Layout>
    );
  }
}

export default NotFound;
