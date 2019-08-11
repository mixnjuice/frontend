import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Button, Card, Form } from 'react-bootstrap';
import DashLink from 'components/Dashboard/Link';
import { UserRoles } from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { actions as rolesActions } from 'reducers/roles';
import { actions as dashActions } from 'reducers/dashboard';
import { actions as usersActions } from 'reducers/users';
import { getAllUsers } from 'selectors/users';

export class RoleAddUser extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array,
    roleId: PropTypes.number,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = { userId: '0', submitting: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestUsers();
  }

  handleChange(e) {
    this.setState({ userId: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitting: true });
    const { userId } = this.state;
    const { actions, roleId } = this.props;

    if (userId === '0') {
      this.setState({ submitting: false });
    } else {
      actions.addRoleUser({ roleId, userId, active: true });
      actions.selectDashboard({ name: 'Roles' });
    }
  }

  render() {
    const { users, name } = this.props;
    const { userId, submitting } = this.state;

    return (
      <Fragment>
        <Helmet title="Add Role - Dashboard" />
        <Card>
          <Card.Body>
            <Card.Title>Roles &gt; Assign {name} Role</Card.Title>
            <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;
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
                  {users.map((user, index) => {
                    return (
                      <option value={user.id} key={index}>
                        {user.emailAddress}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Save</span>
              </Button>
            </Form>
          </Card.Body>
        </Card>
        {userId !== '0' && (
          <Card variant="info">
            <Card.Body>
              <UserRoles userId={userId} />
            </Card.Body>
          </Card>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: getAllUsers(state)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleAddUser);
