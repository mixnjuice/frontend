import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container, Row } from 'react-bootstrap';

import Header from './templates/Header';

import Footer from './templates/Footer';

import { Router } from '@reach/router';

import Calculator from './pages/Calculator';

import Flavors from './pages/Flavors';

import Home from './pages/Home';

import Profile from './pages/user/Profile';
import UserRecipes from './pages/user/Recipes';
import Favorites from './pages/user/Favorites';
import FlavorStash from './pages/user/FlavorStash';
import UserSettings from './pages/user/Settings';

import Login from './pages/Login';

import Register from './pages/Register';

export class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Row>
          <Router primary={false}>
            <Home path="/" />
            <Profile path="profile" />
            <UserRecipes path="userRecipes" />
            <Favorites path="favorites" />
            <FlavorStash path="flavorStash" />
            <UserSettings path="userSettings" />
            <Login path="login" />
            <Register path="register" />
            <Calculator path="calculator" />
            <Flavors path="flavors" />
          </Router>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(App);
