import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions as themeActions } from 'reducers/theme';
import { getCurrentTheme } from 'selectors/theme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class ThemeContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    theme: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // document.body.classList.add('theme');
    document.body.classList.add('theme--default');
  }
  componentDidUpdate() {
    document.body.classList.toggle('theme--default');
    document.body.classList.toggle('theme--dark');
  }
  render() {
    return (
      <div
        className={
          'theme ' +
          (this.props.theme === 'default' ? 'theme--default' : 'theme--dark')
        }
      >
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  theme: getCurrentTheme(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(themeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeContainer);