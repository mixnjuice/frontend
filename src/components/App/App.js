import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from 'components/Header/Header';

import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Register from 'pages/Register';

import Profile from 'pages/user/Profile';
import UserRecipes from 'pages/user/Recipes';
import Favorites from 'pages/user/Favorites';
import FlavorStash from 'pages/user/FlavorStash';
import UserSettings from 'pages/user/Settings';
import ShoppingList from 'pages/user/ShoppingList';
import Calculator from 'pages/Calculator';
import Flavors from 'pages/Flavors';

import { actions as appActions } from 'reducers/application';

export class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.initApp();
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/userRecipes" component={UserRecipes} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/flavorStash" component={FlavorStash} />
          <Route exact path="/userSettings" component={UserSettings} />
          <Route exact path="/shoppingList" component={ShoppingList} />
          <Route exact path="/calculator" component={Calculator} />
          <Route exact path="/flavors" component={Flavors} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions
    },
    dispatch
  )
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
