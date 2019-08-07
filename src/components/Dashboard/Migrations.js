import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';
import { getMigrations } from 'selectors/application';

export class Migrations extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    migrations: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestMigrations();
  }

  render() {
    const { migrations } = this.props;

    return (
      <Fragment>
        <Helmet title="Database Migrations - Dashboard" />
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Ran</th>
              <th>MD5</th>
            </tr>
          </thead>
          <tbody>
            {migrations.map((migration, index) => {
              if (index === 0) {
                return;
              }
              return (
                <tr key={index}>
                  <td>{migration.version}</td>
                  <td>{migration.name}</td>
                  <td>{migration.runAt}</td>
                  <td>{migration.md5}</td>
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
  migrations: getMigrations(state)
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
)(Migrations);
