import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Container, Form, InputGroup, Col } from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';
import { isRegistering } from 'selectors/application';
import {
  composeValidators,
  required,
  matches,
  email,
  length
} from 'utils/validation';

export class Register extends Component {
  static propTypes = {
    registering: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      registerUser: PropTypes.func.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { actions } = this.props;

    actions.registerUser(values);
  }

  render() {
    const { registering } = this.props;

    return (
      <Container>
        <Helmet title="Register" />
        <h1>User Registration</h1>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Field
                  name="username"
                  validate={composeValidators(required, length(3, 50))}
                >
                  {({ input, meta }) => (
                    <Form.Group as={Col} md="4">
                      <Form.Label>Username</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            @
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          {...input}
                          type="text"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          isInvalid={meta.error && meta.touched}
                        />
                        {meta.touched && meta.error && (
                          <Form.Control.Feedback type="invalid">
                            {meta.error === 'required'
                              ? 'Please enter a username'
                              : 'Username must be between 3 and 50 characters'}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Form.Row>
                <Field
                  name="emailAddress"
                  validate={composeValidators(required, email)}
                >
                  {({ input, meta }) => (
                    <Form.Group as={Col} md="6">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        {...input}
                        type="email"
                        placeholder="Enter email"
                        isInvalid={meta.error && meta.touched}
                      />
                      {meta.touched && meta.error && (
                        <Form.Control.Feedback type="invalid">
                          {meta.error === 'required'
                            ? 'Please enter your email address'
                            : 'Please enter a valid email address'}
                        </Form.Control.Feedback>
                      )}
                      <Form.Text className="text-muted">
                        We&apos;ll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                  )}
                </Field>
                <Field
                  name="emailAddressConfirm"
                  validate={composeValidators(
                    required,
                    email,
                    matches('emailAddress')
                  )}
                >
                  {({ input, meta }) => (
                    <Form.Group as={Col} md="6" controlId="emailConf">
                      <Form.Label>Confirm Email Address</Form.Label>
                      <Form.Control
                        {...input}
                        type="email"
                        placeholder="Confirm Enter email"
                        isInvalid={meta.error && meta.touched}
                      />
                      {meta.touched && meta.error === 'required' && (
                        <Form.Control.Feedback type="invalid">
                          Please re-enter your email address
                        </Form.Control.Feedback>
                      )}
                      {meta.touched && meta.error === 'matches' && (
                        <Form.Control.Feedback type="invalid">
                          Please ensure both email addresses match
                        </Form.Control.Feedback>
                      )}
                      {meta.touched && meta.error === 'email' && (
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid email address
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Form.Row>
                <Field
                  name="password"
                  validate={composeValidators(required, length(8))}
                >
                  {({ input, meta }) => (
                    <Form.Group as={Col} md="6">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        {...input}
                        type="password"
                        placeholder="Enter Password"
                        isInvalid={meta.error && meta.touched}
                      />
                      {meta.touched && meta.error === 'required' && (
                        <Form.Control.Feedback type="invalid">
                          Please enter a password
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                </Field>
                <Field
                  name="passwordConfirm"
                  validate={composeValidators(required, matches('password'))}
                >
                  {({ input, meta }) => (
                    <Form.Group as={Col} md="6">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        {...input}
                        type="password"
                        placeholder="Confirm Password"
                        isInvalid={meta.error && meta.touched}
                      />
                      {meta.touched && meta.error === 'required' && (
                        <Form.Control.Feedback type="invalid">
                          Please re-enter your password
                        </Form.Control.Feedback>
                      )}
                      {meta.touched && meta.error === 'matches' && (
                        <Form.Control.Feedback type="invalid">
                          Please ensure both passwords match
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Form.Row>
                <Field type="checkbox" name="termsAgreed" validate={required}>
                  {({ input, meta }) => (
                    <Form.Group>
                      <Form.Check
                        {...input}
                        label="I agree to comply with the Terms of Service"
                        isInvalid={meta.error && meta.touched}
                      />
                      {meta.touched && meta.error && (
                        <Form.Control.Feedback type="invalid">
                          Please accept the Terms of Service
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="2">
                  <Button
                    className="button-animation"
                    variant="primary"
                    type="submit"
                    disabled={submitting && !registering}
                  >
                    <span>Register</span>
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  registering: isRegistering(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
