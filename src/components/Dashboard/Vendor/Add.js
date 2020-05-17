import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Col, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as vendorActions } from 'reducers/vendor';
import { actions as dashActions } from 'reducers/dashboard';

export class VendorAdd extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name, slug, code }) {
    const { actions } = this.props;

    actions.createVendor({ name, slug, code });
    actions.selectDashboard({ name: 'Vendors' });
  }

  render() {
    const { layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Add Vendor - Dashboard"
        header="Vendors &gt; Add Vendor"
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#vendors" name="Vendors">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Field name="name" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        {...input}
                        type="text"
                        isInvalid={meta.error}
                      />
                      {meta.error && (
                        <Form.Control.Feedback type="invalid">
                          {meta.error === 'required'
                            ? 'This field is required'
                            : ''}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Form.Row>
                <Field name="slug" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridSlug">
                      <Form.Label>Slug</Form.Label>
                      <Form.Control
                        {...input}
                        type="text"
                        isInvalid={meta.error}
                      >
                        {meta.error && (
                          <Form.Control.Feedback type="invalid">
                            {meta.error === 'required'
                              ? 'This field is required'
                              : ''}
                          </Form.Control.Feedback>
                        )}
                      </Form.Control>
                    </Form.Group>
                  )}
                </Field>
                <Field name="code" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridCode">
                      <Form.Label>Code</Form.Label>
                      <Form.Control
                        {...input}
                        type="text"
                        isInvalid={meta.error}
                      >
                        {meta.error && (
                          <Form.Control.Feedback type="invalid">
                            {meta.error === 'required'
                              ? 'This field is required'
                              : ''}
                          </Form.Control.Feedback>
                        )}
                      </Form.Control>
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Save</span>
              </Button>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </Form>
          )}
        />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...vendorActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(null, mapDispatchToProps)(VendorAdd);
