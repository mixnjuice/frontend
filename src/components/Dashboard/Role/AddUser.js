import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout,
  UserRoles
} from 'components/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as rolesActions } from 'reducers/roles';
import { actions as dashActions } from 'reducers/dashboard';
import { actions as usersActions } from 'reducers/users';
import { getAllUsers } from 'selectors/users';

export class RoleAddUser extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    name: PropTypes.string,
    layoutOptions: PropTypes.object.isRequired,
    roleId: PropTypes.number,
    collection: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = { userId: '0', submitting: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestUsers({ page: 1, limit: 100 });
  }

  handleChange(e) {
    const { actions } = this.props;
    const userId = Number(e.target.value);

    this.setState({ userId });
    // Refresh User Roles for <UserRoles /> component
    actions.requestUserRoles({ userId });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    const { userId } = this.state;
    const { actions, roleId } = this.props;

    if (userId === '0') {
      this.setState({ submitting: false });
    } else {
      actions.createRoleUser({ roleId, userId, active: true });
      actions.selectDashboard({ name: 'Roles' });
    }
  }

  render() {
    const { collection, name, layoutOptions, roleId } = this.props;
    const { userId, submitting } = this.state;
    const isUserIdSelected = userId !== '0';

    return (
      <Layout
        pageTitle="Add Role - Dashboard"
        header={`Roles > Assign ${name} Role`}
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#roles" name="Roles">
          Back
        </DashLink>
        <Form noValidate onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Select User to Assign to {name}s Role</Form.Label>
            <Form.Control
              as="select"
              name="userId"
              onChange={e => this.handleChange(e)}
              value={userId}
            >
              <option value="0" key="x">
                Choose a User
              </option>
              {collection.map((user, index) => {
                return (
                  <option value={user.id} key={index}>
                    {user.UserProfile.name} ({user.emailAddress})
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          {isUserIdSelected && (
            <Button
              className="button-animation"
              variant="primary"
              type="submit"
              disabled={submitting}
            >
              <span>Save</span>
            </Button>
          )}
        </Form>
        <br />
        {isUserIdSelected && (
          <UserRoles
            layoutOptions={{ header: false, title: true, border: 'info' }}
            userId={userId}
            roleId={roleId}
          />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  collection: getAllUsers(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...rolesActions,
      ...dashActions,
      ...usersActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleAddUser);
