import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import DashLink from 'components/Dashboard/Link';
import RolesEditor from 'components/Dashboard/RolesEditor';
import { Table } from 'react-bootstrap';

import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles } from 'selectors/roles';

export class Roles extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    roles: PropTypes.array,
    modalShow: PropTypes.bool
  };
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      setModelShow: false
    };
  }

  setModalShow() {
    if (!this.state.modalShow) {
      this.setState({ modalShow: true });
    } else {
      this.setState({ modalShow: false });
    }
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestRoles();
  }

  render() {
    const { roles } = this.props;
    const { modalShow } = this.state;

    return (
      <Fragment>
        <Helmet title="Roles - Dashboard" />
        <h2>Roles</h2>
        <a href="#roles/editor/add" onClick={e => this.setModalShow(true, e)}>
          Add Role
        </a>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              return (
                <tr key={index}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <DashLink
                      to={'#roleusers/' + role.id}
                      name="RoleUsers"
                      item={role.id}
                    >
                      Users
                    </DashLink>
                    &nbsp;
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <a href="#roles/editor/add" onClick={e => this.setModalShow(true, e)}>
          Add Role
        </a>
        <RolesEditor
          show={modalShow}
          onHide={e => this.setModalShow(false, e)}
          action="add"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  roles: getAllRoles(state)
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
)(Roles);
