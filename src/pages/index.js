import { lazy } from 'react';

export const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/Home')
);
export const Login = lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/Login')
);
export const NotFound = lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/NotFound')
);
export const Register = lazy(() =>
  import(/* webpackChunkName: "home" */ 'pages/Register')
);
export const Profile = lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Profile')
);
export const UserRecipes = lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Recipes')
);
export const Favorites = lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Favorites')
);
export const FlavorStash = lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/FlavorStash')
);
export const UserSettings = lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/Settings')
);
export const ShoppingList = lazy(() =>
  import(/* webpackChunkName: "user" */ 'pages/user/ShoppingList')
);
export const Recipes = lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Recipes')
);
export const Calculator = lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Calculator')
);
export const Flavors = lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Flavors')
);
export const Recipe = lazy(() =>
  import(/* webpackChunkName: "recipe" */ 'pages/Recipe')
);
