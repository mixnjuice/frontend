import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
// import { bindActionCreators } from 'redux';
import Home from './Home';
import Users from './Users';
// import { actions as appActions } from 'reducers/application';
// import { getDashboard } from 'selectors/application';

export class ComponentSelector extends Component {
  static propTypes = {
    /* actions: PropTypes.object.isRequired, */
    dashboard: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
  }
  /*
  componentDidMount() {
    const { actions } = this.props;

    actions.requestDashboard();
  }
  */
  selector(dashboard) {
    switch (dashboard) {
      case 'Users':
        return <Users />;
      case 'Home':
      default:
        return <Home />;
    }
  }

  render() {
    const { dashboard } = this.props;

    return <Fragment>{this.selector(dashboard)}</Fragment>;
  }
}
/*
const mapStateToProps = state => ({
  dashboard: getDashboard(state)
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
)(ComponentSelector);
*/
