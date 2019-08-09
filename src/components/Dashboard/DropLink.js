import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'react-bootstrap';

import { actions as dashboardActions } from 'reducers/dashboard';
import { getDashboardComponent } from 'selectors/dashboard';

export class DropLink extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRquired,
    item: PropTypes.number,
    key: PropTypes.number
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
    const { to, name, item, key } = this.props;

    return (
      <Fragment>
        <Dropdown.Item
          href={to}
          onClick={e => this.select(name, item, e)}
          key={key}
        >
          {this.props.children}
        </Dropdown.Item>
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
)(DropLink);
