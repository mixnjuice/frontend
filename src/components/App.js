import React, { Component } from 'react';

import { connect } from 'react-redux';

export class App extends Component {
  render() {
    return <h1>Hello World</h1>;
  }
}

export default connect(
  null,
  null
)(App);
