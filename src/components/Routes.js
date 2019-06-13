import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Router } from '@reach/router';

import Calculator from './pages/Calculator';

import Flavors from './pages/Flavors';

import Home from './pages/Home';

import Profile from './pages/user/Profile';

// import NotFound from './pages/NotFound';

export class Routes extends Component {
  render() {
    return (
      <Router primary={false}>
        <Home path="/" />
        <Profile path="user/*" />
        <Calculator path="calculator" />
        <Flavors path="flavors" />
      </Router>
    );
  }
}

export default connect(
  null,
  null
)(Home);
