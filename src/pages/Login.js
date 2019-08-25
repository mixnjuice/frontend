import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { Form as FinalForm, Field } from 'react-final-form';
import { withLastLocation } from 'react-router-last-location';

import { actions as appActions } from 'reducers/application';
import { required, email, length, composeValidators } from 'utils/validation';
import { isLoggingIn, isLoggedIn } from 'selectors/application';

export class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    lastLocation: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string
    })
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ emailAddress, password }) {
    const { actions } = this.props;

    actions.loginUser(emailAddress, password);
  }

  render() {
    const { loggingIn, loggedIn, lastLocation } = this.props;

    if (loggedIn) {
      return <Redirect to={lastLocation.pathname} />;
    }

    return (
      <Container>
        <Helmet title="Login" />
        <h1>Login</h1>
        <FinalForm
          onSubmit={this.handleSubmit}
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
}

const mapStateToProps = state => ({
  loggingIn: isLoggingIn(state),
  loggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLastLocation(Login));
