import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, Container, Form } from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';

export class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      emailAddress: '',
      password: ''
    };
  }

  handleSubmit(e) {
    const { emailAddress, password } = this.state;
    const { actions } = this.props;

    actions.loginUser(emailAddress, password);
    e.preventDefault();
  }

  handleTextChange(e) {
    const { target } = e;
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    const { emailAddress, password } = this.state;

    return (
      <Container>
        <h1>Login</h1>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="emailAddress"
              placeholder="someone@widget.co"
              value={emailAddress}
              onChange={this.handleTextChange}
            />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              value={password}
              onChange={this.handleTextChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
