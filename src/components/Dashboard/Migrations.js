import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';
import { DashboardLayout as Layout } from 'components/Dashboard';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getMigrations } from 'selectors/dashboard';

export class Migrations extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    migrations: PropTypes.array
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.requestMigrations();
  }

  render() {
    const { migrations, layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Database Migrations - Dashboard"
        header="Database &gt; Migrations"
        options={layoutOptions}
      >
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
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ migrations: getMigrations(state) });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Migrations);
