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
        className="nav--link-custom px-3"
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
        className="nav--link-custom"
        activeClassName="active"
      >
        {text}
        <br />
      </NavDropdown.Item>
    );
  }

  render() {
    return (
      <Container fluid>
        <Row className="navigation-container">
          <Col>
            <Navbar expand="lg">
              <Navbar.Brand className="pt-0">
                <img src="/media/logo.svg" alt="logo" width="175" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                <Nav>
                  {this.renderNavItem('/', 'Home')}
                  {this.renderNavItem('/recipes', 'Recipes')}
                  {this.renderNavItem('/calculator', 'Calculator')}
                  {this.renderNavItem('/flavors', 'Flavors')}
                  <NavDropdown title="User">
                    {this.renderNavDropdownItem('/user/profile', 'Profile')}
                    {this.renderNavDropdownItem('/user/recipes', 'Recipes')}
                    {this.renderNavDropdownItem('/user/favorites', 'Favorites')}
                    {this.renderNavDropdownItem(
                      '/user/flavor-stash',
                      'Flavor Stash'
                    )}
                    {this.renderNavDropdownItem(
                      '/user/shopping-list',
                      'Shopping List'
                    )}
                    {this.renderNavDropdownItem('/user/settings', 'Settings')}
                  </NavDropdown>
                  {this.renderNavItem('/login', 'Login')}
                  {this.renderNavItem('/register', 'Register')}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}
