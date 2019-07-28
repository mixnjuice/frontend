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
              <Navbar.Collapse className="justify-content-center">
                <Nav>
                  {this.renderNavItem('/', 'Home')}
                  {this.renderNavItem('/calculator', 'Calculator')}
                  {this.renderNavItem('/recipe', 'Recipes')}
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
            <hr />
          </Col>
        </Row>
      </Container>
    );
  }
}
