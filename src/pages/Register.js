import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
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

export default function Register() {
  const dispatch = useDispatch();
  const registering = useSelector(isRegistering);
  const handleSubmit = useCallback(
    (values) => dispatch(appActions.registerUser(values)),
    [dispatch]
  );

  return (
    <Container>
      <Helmet title="Register" />
      <h1>User Registration</h1>
      <FinalForm
        onSubmit={handleSubmit}
        render={({ handleSubmit: submit, submitting }) => (
          <Form noValidate onSubmit={submit} data-testid="register-form">
            <Form.Row>
              <Field
                name="username"
                validate={composeValidators(required, length(3, 50))}
              >
                {({ input, meta }) => (
                  <Form.Group as={Col} md="4">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        {...input}
                        id="username"
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
                    <Form.Label htmlFor="email-address">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      {...input}
                      id="email-address"
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
                  <Form.Group as={Col} md="6">
                    <Form.Label htmlFor="email-address-confirm">
                      Confirm Email Address
                    </Form.Label>
                    <Form.Control
                      {...input}
                      id="email-address-confirm"
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
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      {...input}
                      id="password"
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
                    <Form.Label htmlFor="password-confirm">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      {...input}
                      id="password-confirm"
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
                      data-testid="terms-checkbox"
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
