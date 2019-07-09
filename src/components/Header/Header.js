import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';

export default class Header extends Component {
  renderNavItem(to, text) {
    return (
      <Nav.Link
        as={NavLink}
        exact
        to={to}
        className="borderLeftRight px-3"
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
      <Container className="navigation-container" fluid>
        <Row className="text-center">
          <Col>
            <Navbar.Brand>MixNJuice</Navbar.Brand>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar expand="lg" className="justify-content-center">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-center"
              >
                <Nav>
                  {this.renderNavItem('/', 'Home')}
                  {this.renderNavItem('/calculator', 'Create Recipe')}
                  <NavDropdown title="User" id="basic-nav-dropdown">
                    {this.renderNavDropdownItem('/profile', 'Profile')}
                    {this.renderNavDropdownItem('/userRecipes', 'Recipes')}
                    {this.renderNavDropdownItem('/favorites', 'Favorites')}
                    {this.renderNavDropdownItem('/flavorStash', 'Flavor Stash')}
                    {this.renderNavDropdownItem(
                      '/shoppingList',
                      'Shopping List'
                    )}
                    {this.renderNavDropdownItem('/userSettings', 'Settings')}
                  </NavDropdown>
                  {this.renderNavItem('/login', 'Login')}
                  {this.renderNavItem('/register', 'Register')}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <hr />
          </Col>
        </Row>
      </Container>
    );
  }
}
