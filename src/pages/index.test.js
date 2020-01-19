import { lazy } from 'react';

import {
  imports,
  Calculator,
  Dashboard,
  Favorites,
  Flavors,
  FlavorStash,
  Home,
  Login,
  NotFound,
  Profile,
  Recipe,
  Recipes,
  Register,
  ShoppingList,
  UserRecipes,
  UserSettings
} from 'pages';

describe('pages module', () => {
  it('has Calculator page', async () => {
    expect(imports.Calculator()).toEqual(import('pages/Calculator'));
    expect(Calculator).toEqual(lazy(imports.Calculator));
  });

  it('has Dashboard page', async () => {
    expect(imports.Dashboard()).toEqual(import('pages/Dashboard'));
    expect(Dashboard).toEqual(lazy(imports.Dashboard));
  });

  it('has Favorites page', async () => {
    expect(imports.Favorites()).toEqual(import('pages/user/Favorites'));
    expect(Favorites).toEqual(lazy(imports.Favorites));
  });

  it('has Flavors page', async () => {
    expect(imports.Flavors()).toEqual(import('pages/Flavors'));
    expect(Flavors).toEqual(lazy(imports.Flavors));
  });

  it('has FlavorStash page', async () => {
    expect(imports.FlavorStash()).toEqual(import('pages/user/FlavorStash'));
    expect(FlavorStash).toEqual(lazy(imports.FlavorStash));
  });

  it('has Home page', async () => {
    expect(imports.Home()).toEqual(import('pages/Home'));
    expect(Home).toEqual(lazy(imports.Home));
  });

  it('has Login page', async () => {
    expect(imports.Login()).toEqual(import('pages/Login'));
    expect(Login).toEqual(lazy(imports.Login));
  });

  it('has NotFound page', async () => {
    expect(imports.NotFound()).toEqual(import('pages/NotFound'));
    expect(NotFound).toEqual(lazy(imports.NotFound));
  });

  it('has Profile page', async () => {
    expect(imports.Profile()).toEqual(import('pages/user/Profile'));
    expect(Profile).toEqual(lazy(imports.Profile));
  });

  it('has Recipe page', async () => {
    expect(imports.Recipe()).toEqual(import('pages/Recipe'));
    expect(Recipe).toEqual(lazy(imports.Recipe));
  });

  it('has Recipes page', async () => {
    expect(imports.Recipes()).toEqual(import('pages/Recipes'));
    expect(Recipes).toEqual(lazy(imports.Recipes));
  });

  it('has Register page', async () => {
    expect(imports.Register()).toEqual(import('pages/Register'));
    expect(Register).toEqual(lazy(imports.Register));
  });

  it('has ShoppingList page', async () => {
    expect(imports.ShoppingList()).toEqual(import('pages/user/ShoppingList'));
    expect(ShoppingList).toEqual(lazy(imports.ShoppingList));
  });

  it('has UserRecipes page', async () => {
    expect(imports.UserRecipes()).toEqual(import('pages/user/Recipes'));
    expect(UserRecipes).toEqual(lazy(imports.UserRecipes));
  });

  it('has UserSettings page', async () => {
    expect(imports.UserSettings()).toEqual(import('pages/user/Settings'));
    expect(UserSettings).toEqual(lazy(imports.UserSettings));
  });
});
