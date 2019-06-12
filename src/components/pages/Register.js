import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup
} from 'react-bootstrap';

export class Register extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      email: '',
      emailConf: '',
      passw: '',
      passwConf: '',
      message: '',
      errorMessage: false
    };
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    if (this.state.passwConf !== this.state.passw) {
      this.setState({ passwConf: '' });
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.state.emailConf !== this.state.email) {
      this.setState({ emailConf: '' });
      event.preventDefault();
      event.stopPropagation();
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;

    const errorMessage = this.state.errorMessage;

    return (
      <Container>
        <h1>User Registration</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={this.state.email}
                onChange={event => this.handleUserInput(event)}
                placeholder="Enter email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="emailConf">
              <Form.Label>Confirm Email Address</Form.Label>
              <Form.Control
                name="emailConf"
                type="email"
                value={this.state.emailConf}
                onChange={event => this.handleUserInput(event)}
                placeholder="Confirm Enter email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
              {this.state.email !== this.state.emailConf && (
                <Alert as="span" variant="danger">
                  Email Addresses do not match
                </Alert>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="passw">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="passw"
                type="password"
                value={this.state.passw}
                onChange={event => this.handleUserInput(event)}
                placeholder="Enter Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="passwConf">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="passwConf"
                type="password"
                value={this.state.passwConf}
                onChange={event => this.handleUserInput(event)}
                placeholder="Confirm Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
              {this.state.passw !== this.state.passwConf && (
                <Alert as="span" variant="danger">
                  Passwords do not match
                </Alert>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} md="2">
              <Button type="submit">
                <span>Register</span>
              </Button>
              &nbsp;
            </Form.Group>
            <Form.Group as={Col} md="3">
              {errorMessage && (
                <Alert as="span" variant="danger">
                  {this.state.message}
                </Alert>
              )}
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(Register);
