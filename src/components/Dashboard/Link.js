import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

export class Link extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    name: PropTypes.string.isRquired,
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

    actions.selectDashboard({
      name,
      item
    });
  }

  render() {
    const { to, name, item, className } = this.props;

    return (
      <Fragment>
        <a
          href={to}
          onClick={e => this.select(name, item, e)}
          className={className}
        >
          {this.props.children}
        </a>
      </Fragment>
    );
  }
}

// export default Dashboard;

const mapStateToProps = state => ({
  dashboardComponent: getDashboardComponent(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...dashboardActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);
