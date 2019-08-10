import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Alert, Table } from 'react-bootstrap';
import DashLink from 'components/Dashboard/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles, getRoleUsers } from 'selectors/roles';

export class RoleUsers extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    roles: PropTypes.array,
    item: PropTypes.number,
    roleUsers: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.updateRoleId = this.updateRoleId.bind(this);
  }
  updateRoleId(roleId) {
    const { actions } = this.props;

    actions.requestRoleUsers({ roleId });
  }
  componentDidMount() {
    const { actions, item } = this.props;

    actions.requestRoles();
    if (item !== null) {
      actions.requestRoleUsers({ roleId: item });
    }
  }

  render() {
    const { item, roles, roleUsers } = this.props;

    return (
      <Fragment>
        <Helmet title="Role Users - Dashboard" />
        <h2>Roles &gt; {roles[item - 1].name}s</h2>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;
        <DashLink to="#roles" name="Roles">
          Back
        </DashLink>
        {!roleUsers && <Alert>No Users Assigned to this Role!</Alert>}
        {roleUsers && (
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {roleUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.userId}</td>
                    <td>{user.User.emailAddress}</td>
                    <td>options</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  roles: getAllRoles(state),
  roleUsers: getRoleUsers(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...rolesActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleUsers);
