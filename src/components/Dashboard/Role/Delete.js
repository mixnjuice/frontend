import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { Button, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout,
  RoleUsers
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as rolesActions } from 'reducers/roles';
import { actions as dashActions } from 'reducers/dashboard';

export class RoleDelete extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    opt: PropTypes.object.isRequired,
    roleId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { actions, roleId, name } = this.props;

    actions.deleteRole({ roleId, name });
    actions.selectDashboard({ name: 'Roles' });
  }

  render() {
    const { name, opt, roleId } = this.props;

    return (
      <Layout
        pageTitle="Delete Role - Dashboard"
        header={`Roles > Delete Role > ${name}`}
        options={opt}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#roles" name="Roles">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Delete</Form.Label>
                <h3>Delete Role: {name}?</h3>
              </Form.Group>
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Delete</span>
              </Button>
            </Form>
          )}
        />
        <br />
        <RoleUsers
          opt={{ header: false, title: true, border: 'danger' }}
          roleId={Number(roleId)}
          name={name}
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
)(RoleDelete);
