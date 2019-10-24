import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { bindActionCreators } from 'redux';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as usersActions } from 'reducers/users';
import { getAllUsers, getUsersPager } from 'selectors/users';

export class Users extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object,
    collection: PropTypes.array,
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

    actions.requestUsers({ page: 1, limit: 20 });
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
    actions.requestUsers({ ...pager, page: Number(page.target.value) });
  }

  changeLimit(limit) {
    this.setState({ limit: limit.target.value });
  }

  updateLimit() {
    const { actions, pager } = this.props;
    const { limit } = this.state;

    actions.requestUsers({ ...pager, limit: Number(limit) });
  }

  render() {
    const { collection, layoutOptions, pager } = this.props;

    return (
      <Layout
        pageTitle="Users - Dashboard"
        header="Users"
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
              <th>Email</th>
              <th>Activated</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{user.id}</td>
                  <td>{user.emailAddress}</td>
                  <td className="text-center">
                    {user.activationCode === null ? (
                      <FontAwesomeIcon icon="check" color="green" title="Yes" />
                    ) : (
                      <FontAwesomeIcon icon="times" color="red" title="No" />
                    )}
                  </td>
                  <td className="text-center">
                    <Link to="/user/profile">Profile</Link>
                    &nbsp; | &nbsp;
                    <DashLink
                      to={`#user/${user.id}/roles`}
                      name="User/Roles"
                      item={Number(user.id)}
                    >
                      Roles
                    </DashLink>
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
            <Col>{pager.count} Users</Col>
            <Col className="text-right">{pager.pages} Pages</Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  collection: getAllUsers(state),
  pager: getUsersPager(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(usersActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
