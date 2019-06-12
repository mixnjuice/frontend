import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button, Container, Form } from 'react-bootstrap';

export class Login extends Component {
  render() {
    return (
      <Container>
        <h1>Login</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            <span>Login</span>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(Login);
