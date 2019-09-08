import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as rolesActions } from 'reducers/roles';
import { actions as dashActions } from 'reducers/dashboard';

export class RoleEdit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    roleId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name }) {
    const { actions, roleId } = this.props;

    actions.updateRole({ roleId, name });
    actions.selectDashboard({ name: 'Roles' });
  }

  render() {
    const { name, layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Edit Role - Dashboard"
        header={`Roles > Edit Role > ${name}`}
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#roles" name="Roles">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Field name="name" required="true">
                {({ input, meta }) => (
                  <Form.Group>
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control
                      {...input}
                      type="text"
                      placeholder={name}
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
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Save</span>
              </Button>
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
      ...rolesActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(RoleEdit);
