import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import BodyClassName from 'react-body-classname';
import { getTheme } from 'selectors/application';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import ToastDrawer from 'components/ToastDrawer/ToastDrawer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { actions as appActions } from 'reducers/application';
import {
  Dashboard,
  Favorites,
  Flavors,
  FlavorStash,
  Home,
  Login,
  NotFound,
  Profile,
  Recipe,
  RecipeEditor,
  Recipes,
  Register,
  ShoppingList,
  UserRecipes,
  UserSettings
} from 'pages';
import SuspenseFallback from 'components/SuspenseFallback/SuspenseFallback';

export class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    theme: PropTypes.string
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.initApp();
  }

  render() {
    return (
      <BodyClassName className={'theme--' + this.props.theme}>
        <Suspense fallback={<SuspenseFallback />}>
          <ErrorBoundary>
            <Helmet defaultTitle="MixNJuice" titleTemplate="MixNJuice - %s" />
            <Header />
            <ToastDrawer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/recipes" component={Recipes} />
              <PrivateRoute
                exact
                path="/recipe/editor"
                component={RecipeEditor}
              />
              <Route exact path="/flavors" component={Flavors} />
              <Route exact path="/recipe" component={Recipe} />
              <PrivateRoute exact path="/user/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/user/recipes"
                component={UserRecipes}
              />
              <PrivateRoute
                exact
                path="/user/favorites"
                component={Favorites}
              />
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
              <PrivateRoute
                exact
                path="/user/settings"
                component={UserSettings}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/user/:userName" component={Profile} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </BodyClassName>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
});

const mapStateToProps = state => ({
  theme: getTheme(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
