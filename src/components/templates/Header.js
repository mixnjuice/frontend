import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from '@reach/router';

import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';

console.log(window.location);
export class Header extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeLink: ''
    };
  }

  isActive({ isCurrent }) {
    return isCurrent
      ? { className: 'nav-link borderLeftRight active' }
      : { className: 'nav-link borderLeftRight' };
  }
  render() {
    return (
      <Navbar expand="lg" id="navbarNav">
        <Navbar.Brand href="#home">MixNJuice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" getProps={this.isActive}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="calculator" getProps={this.isActive}>
              Create Recipe
            </Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="user" getProps={this.isActive}>
                Profile
              </NavDropdown.Item>
              <br />
              <NavDropdown.Item as={Link} to="user" getProps={this.isActive}>
                Recipes
              </NavDropdown.Item>
              <br />
              <NavDropdown.Item as={Link} to="user" getProps={this.isActive}>
                Favorites
              </NavDropdown.Item>
              <br />
              <NavDropdown.Item as={Link} to="user" getProps={this.isActive}>
                Flavor Stash
              </NavDropdown.Item>
              <br />
            </NavDropdown>
            <Nav.Link as={Link} to="login" getProps={this.isActive}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="register" getProps={this.isActive}>
              Register
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button className="buttonLeft">
              <span>Search</span>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  null,
  null
)(Header);
