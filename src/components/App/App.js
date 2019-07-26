import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from 'components/Header/Header';
import ToastDrawer from 'components/ToastDrawer/ToastDrawer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

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
import Recipe from 'pages/Recipe';

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
        <Helmet defaultTitle="MixNJuice" titleTemplate="MixNJuice - %s" />
        <Header />
        <ToastDrawer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/calculator" component={Calculator} />
          <Route exact path="/flavors" component={Flavors} />
          <Route exact path="/recipe" component={Recipe} />
          <PrivateRoute exact path="/user/profile" component={Profile} />
          <PrivateRoute exact path="/user/recipes" component={UserRecipes} />
          <PrivateRoute exact path="/user/favorites" component={Favorites} />
          <PrivateRoute
            exact
            path="/user/flavor-stash"
            component={FlavorStash}
          />
          <PrivateRoute
            exact
            path="/user/shopping-list"
            component={ShoppingList}
          />
          <PrivateRoute exact path="/user/settings" component={UserSettings} />
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
