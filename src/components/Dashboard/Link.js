import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

export class DashboardLink extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    name: PropTypes.string,
    to: PropTypes.string.isRequired,
    item: PropTypes.any,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select(name, item = null) {
    const { actions } = this.props;

    actions.selectDashboard({ name, item });
  }

  render() {
    const { to, name, item, className } = this.props;

    return (
      <Fragment>
        <a
          href={to}
          onClick={() => this.select(name, item)}
          className={className}
        >
          {this.props.children}
        </a>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboardComponent: getDashboardComponent(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(dashboardActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLink);
