import { lazy } from 'react';

export const imports = {
  Calculator: () => import(/* webpackChunkName: "recipe" */ 'pages/Calculator'),
  Dashboard: () => import(/* webpackChunkName: "recipe" */ 'pages/Dashboard'),
  Favorites: () =>
    import(/* webpackChunkName: "user" */ 'pages/user/Favorites'),
  Flavors: () => import(/* webpackChunkName: "recipe" */ 'pages/Flavors'),
  FlavorStash: () =>
    import(/* webpackChunkName: "user" */ 'pages/user/FlavorStash'),
  Home: () => import(/* webpackChunkName: "home" */ 'pages/Home'),
  Login: () => import(/* webpackChunkName: "home" */ 'pages/Login'),
  NotFound: () => import(/* webpackChunkName: "home" */ 'pages/NotFound'),
  Profile: () => import(/* webpackChunkName: "user" */ 'pages/user/Profile'),
  Recipe: () => import(/* webpackChunkName: "recipe" */ 'pages/Recipe'),
  Recipes: () => import(/* webpackChunkName: "recipe" */ 'pages/Recipes'),
  Register: () => import(/* webpackChunkName: "home" */ 'pages/Register'),
  ShoppingList: () =>
    import(/* webpackChunkName: "user" */ 'pages/user/ShoppingList'),
  UserRecipes: () =>
    import(/* webpackChunkName: "user" */ 'pages/user/Recipes'),
  UserSettings: () =>
    import(/* webpackChunkName: "user" */ 'pages/user/Settings')
};

export const Calculator = lazy(imports.Calculator);
export const Dashboard = lazy(imports.Dashboard);
export const Favorites = lazy(imports.Favorites);
export const Flavors = lazy(imports.Flavors);
export const FlavorStash = lazy(imports.FlavorStash);
export const Home = lazy(imports.Home);
export const Login = lazy(imports.Login);
export const NotFound = lazy(imports.NotFound);
export const Profile = lazy(imports.Profile);
export const Recipe = lazy(imports.Recipe);
export const Recipes = lazy(imports.Recipes);
export const Register = lazy(imports.Register);
export const ShoppingList = lazy(imports.ShoppingList);
export const UserRecipes = lazy(imports.UserRecipes);
export const UserSettings = lazy(imports.UserSettings);
