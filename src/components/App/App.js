import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import React, { Component, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from 'components/Header/Header';
import ToastDrawer from 'components/ToastDrawer/ToastDrawer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

const Home = React.lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/Home')
);
const Login = React.lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/Login')
);
const NotFound = React.lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/NotFound')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/Register')
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Profile')
);
const UserRecipes = React.lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Recipes')
);
const Favorites = React.lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Favorites')
);
const FlavorStash = React.lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/FlavorStash')
);
const UserSettings = React.lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Settings')
);
const ShoppingList = React.lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/ShoppingList')
);
const Recipes = React.lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Recipes')
);
const Calculator = React.lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Calculator')
);
const Flavors = React.lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Flavors')
);
const Recipe = React.lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Recipe')
);

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
      <Suspense fallback={<Spinner variant="primary" />}>
        <Helmet defaultTitle="MixNJuice" titleTemplate="MixNJuice - %s" />
        <Header />
        <ToastDrawer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recipes" component={Recipes} />
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
      </Suspense>
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
