import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';
import { getRoles } from 'selectors/application';

export class Roles extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    roles: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestRoles();
  }

  render() {
    const { roles } = this.props;

    return (
      <Fragment>
        <Helmet title="Roles - Dashboard" />
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
                  <td>options</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  roles: getRoles(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roles);
