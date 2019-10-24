import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { Col, Container, Row, Table } from 'react-bootstrap';

import { actions as rolesActions } from 'reducers/roles';
import { getAllRoles, getRolesPager } from 'selectors/roles';

export class Roles extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object,
    roles: PropTypes.array,
    pager: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { limit: 20, page: 1 };
    this.handlePageChange = this.changePage.bind(this);
    this.handleLimitChange = this.changeLimit.bind(this);
    this.handleLimitUpdate = this.updateLimit.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestRoles({ page: 1, limit: 20 });
  }

  pagerCounter() {
    const { pages } = this.props.pager;

    let i = 1;

    const pager = [];

    while (i <= pages) {
      pager[i] = i;
      i++;
    }
    return pager;
  }

  changePage(page) {
    const { actions, pager } = this.props;

    this.setState({ page: page.target.value });
    actions.requestRoles({ ...pager, page: Number(page.target.value) });
  }

  changeLimit(limit) {
    this.setState({ limit: limit.target.value });
  }

  updateLimit() {
    const { actions, pager } = this.props;
    const { limit } = this.state;

    actions.requestRoles({ ...pager, limit: Number(limit) });
  }

  render() {
    const { layoutOptions, pager, roles } = this.props;
    // Administrator and User roles aren't editable

    let noEdit = false;

    return (
      <Layout
        pageTitle="Roles - Dashboard"
        header="Roles"
        options={layoutOptions}
      >
        <Container fluid={true}>
          <Row className="pb-2">
            <Col xs={3}>
              <input
                type="number"
                min="20"
                max="200"
                step="20"
                className="form-control"
                onChange={this.handleLimitChange}
                onBlur={this.handleLimitUpdate}
                value={this.state.limit}
              />
            </Col>
            <Col className="text-right">
              <select
                value={this.state.page}
                onChange={this.handlePageChange}
                onBlur={this.handlePageChange}
              >
                {this.pagerCounter().map((value, i) => (
                  <option value={value} key={i}>
                    Page {value}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Container>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => {
              if (role.name === 'Administrator' || role.name === 'User') {
                noEdit = true;
              } else {
                noEdit = false;
              }
              return (
                <tr key={index}>
                  <td className="text-center">{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <DashLink
                      to={`#role/users/${role.id}`}
                      name="Role/Users"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Users
                    </DashLink>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#role/${role.id}/add/user`}
                      name="Role/Add/User"
                      item={{ roleId: role.id, name: role.name }}
                    >
                      Assign
                    </DashLink>
                    {!noEdit && (
                      <Fragment>
                        &nbsp; | &nbsp;
                        <DashLink
                          to={`#role/edit/${role.id}`}
                          name="Role/Edit"
                          item={{ roleId: role.id, name: role.name }}
                        >
                          Edit
                        </DashLink>
                        &nbsp; | &nbsp;
                        <DashLink
                          to={`#role/delete/${role.id}`}
                          name="Role/Delete"
                          item={{ roleId: role.id, name: role.name }}
                        >
                          Delete
                        </DashLink>
                      </Fragment>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Container fluid={true}>
          <Row>
            <Col xs={3}>
              <input
                type="number"
                min="20"
                max="200"
                step="20"
                className="form-control"
                onChange={this.handleLimitChange}
                onBlur={this.handleLimitUpdate}
                value={this.state.limit}
              />
            </Col>
            <Col className="text-right">
              <select
                value={this.state.page}
                onChange={this.handlePageChange}
                onBlur={this.handlePageChange}
              >
                {this.pagerCounter().map((value, i) => (
                  <option value={value} key={i}>
                    Page {value}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>{pager.count} Roles</Col>
            <Col className="text-right">{pager.pages} Pages</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  roles: getAllRoles(state),
  pager: getRolesPager(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(rolesActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roles);
