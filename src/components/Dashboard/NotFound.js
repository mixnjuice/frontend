import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DashboardLayout as Layout } from 'components/Dashboard';

export class NotFound extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    layoutOptions: PropTypes.object
  };

  render() {
    const { name, layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Not Found"
        header="Not Found :("
        options={layoutOptions}
      >
        <h3>Oops!</h3>
        I&apos;ve searched <i>long</i> and &quot;hard&quot;, yet I couldn&apos;t
        find a Dashboard Component identified as <strong>{name}</strong> in{' '}
        <code>components/Dashboard/Main.js</code>
      </Layout>
    );
  }
}

export default NotFound;
