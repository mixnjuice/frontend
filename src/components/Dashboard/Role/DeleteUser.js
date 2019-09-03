import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { Button, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as rolesActions } from 'reducers/roles';
import { actions as dashActions } from 'reducers/dashboard';

export class RoleDeleteUser extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    opt: PropTypes.object.isRequired,
    roleId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { actions, name, roleId, userId } = this.props;

    actions.deleteRoleUser({ userId, roleId, name });
    actions.selectDashboard({ name: 'User/Roles', item: userId });
  }

  render() {
    const { name, opt, userId } = this.props;

    return (
      <Layout
        pageTitle="Unassign Role - Dashboard"
        header={`Roles > Unassign Role > ${name} > User ID: ${userId}`}
        options={opt}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to={`#user/roles/${userId}`} name="User/Roles" item={userId}>
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Unassign Role</Form.Label>
                <h3>
                  Unassign Role: {name} from User ID {userId}?
                </h3>
              </Form.Group>
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Remove</span>
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
)(RoleDeleteUser);
