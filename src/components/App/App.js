import { Helmet } from 'react-helmet';
import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import ToastDrawer from 'components/ToastDrawer/ToastDrawer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import ErrorFallback from 'components/ErrorFallback/ErrorFallback';
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

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.initApp());
  }, [dispatch]);

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Helmet defaultTitle="MixNJuice" titleTemplate="MixNJuice - %s" />
        <Header />
        <ToastDrawer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recipes" component={Recipes} />
          <PrivateRoute exact path="/recipe/editor" component={RecipeEditor} />
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
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/user/:userName" component={Profile} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </ErrorBoundary>
    </Suspense>
  );
}
