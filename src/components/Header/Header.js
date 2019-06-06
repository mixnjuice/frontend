import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class Header extends Component {
  renderNavItem(to, text) {
    return (
      <Nav.Link as={Link} to={to}>
        {text}
      </Nav.Link>
    );
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>MixNJuice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {this.renderNavItem('/', 'Home')}
            {this.renderNavItem('/login', 'Login')}
            {this.renderNavItem('/register', 'Register')}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
