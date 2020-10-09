import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { Form as FinalForm, Field } from 'react-final-form';
import { withLastLocation } from 'react-router-last-location';

import { actions as appActions } from 'reducers/application';
import { required, email, length, composeValidators } from 'utils/validation';
import { isLoggingIn, isLoggedIn } from 'selectors/application';

export function Login({ lastLocation }) {
  const dispatch = useDispatch();
  const doSubmit = useCallback(
    ({ emailAddress, password }) =>
      dispatch(appActions.loginUser(emailAddress, password)),
    [dispatch]
  );
  const loggedIn = useSelector(isLoggedIn);
  const loggingIn = useSelector(isLoggingIn);

  if (loggedIn) {
    return <Redirect to={lastLocation ? lastLocation.pathname : '/'} />;
  }

  return (
    <Container>
      <Helmet title="Login" />
      <h1>Login</h1>
      <FinalForm
        onSubmit={doSubmit}
        render={({ handleSubmit, submitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Field
              name="emailAddress"
              validate={composeValidators(required, email)}
            >
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    {...input}
                    type="email"
                    placeholder="someone@widgets.co"
                    isInvalid={meta.error && meta.touched}
                  />
                  {meta.error && (
                    <Form.Control.Feedback type="invalid">
                      {meta.error === 'required'
                        ? 'This field is required'
                        : 'Not a valid email address'}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required, length(8))}
            >
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    {...input}
                    type="password"
                    isInvalid={meta.error && meta.touched}
                  />
                  {meta.error && (
                    <Form.Control.Feedback type="invalid">
                      {meta.error === 'required'
                        ? 'This field is required'
                        : 'Minimum length is eight characters'}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
            </Field>
            <Button
              className="button-animation"
              variant="primary"
              type="submit"
              disabled={submitting || loggingIn}
            >
              <span>Login</span>
            </Button>
          </Form>
        )}
      />
    </Container>
  );
}

Login.propTypes = {
  lastLocation: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string
  })
};

export default withLastLocation(Login);
