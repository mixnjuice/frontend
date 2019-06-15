import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default class Header extends Component {
  isActive({ isCurrent }) {
    return isCurrent
      ? { className: 'nav-link borderLeftRight active' }
      : { className: 'nav-link borderLeftRight' };
  }

  renderNavItem(to, text) {
    return (
      <Nav.Link
        as={NavLink}
        exact
        to={to}
        className="borderLeftRight"
        activeClassName="active"
      >
        {text}
      </Nav.Link>
    );
  }

  renderNavDropdownItem(to, text) {
    return (
      <NavDropdown.Item
        as={NavLink}
        exact
        to={to}
        className="borderLeftRight"
        activeClassName="active"
      >
        {text}
        <br />
      </NavDropdown.Item>
    );
  }

  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Brand>MixNJuice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {this.renderNavItem('/', 'Home')}
            {this.renderNavItem('/calculator', 'Create Recipe')}
            <NavDropdown title="User" id="basic-nav-dropdown">
              {this.renderNavDropdownItem('/profile', 'Profile')}
              {this.renderNavDropdownItem('/userRecipes', 'Recipes')}
              {this.renderNavDropdownItem('/favorites', 'Favorites')}
              {this.renderNavDropdownItem('/flavorStash', 'Flavor Stash')}
              {this.renderNavDropdownItem('/userSettings', 'Settings')}
            </NavDropdown>
            {this.renderNavItem('/login', 'Login')}
            {this.renderNavItem('/register', 'Register')}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
