import React, { Component } from 'react';

import { connect } from 'react-redux';

// import { Link } from "@reach/router";

import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';

export class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">MixNJuice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="calculator">Calculator</Nav.Link>
            <Nav.Link href="flavors">Flavors</Nav.Link>
            <Nav.Link href="user">User</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="register">User Registration</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
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
