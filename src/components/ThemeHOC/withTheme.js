import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getThemeName } from 'selectors/theme';
import { connect } from 'react-redux';

export default function withTheme(WrappedComponent) {
  class ThemeHOC extends Component {
    static propTypes = {
      theme: PropTypes.string
    };

    componentDidMount() {
      document.body.classList.add('theme--default');
    }

    componentDidUpdate() {
      if (this.props.theme === 'default') {
        document.body.classList.add('theme--default');
        document.body.classList.remove('theme--dark');
      } else {
        document.body.classList.add('theme--dark');
        document.body.classList.remove('theme--default');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    theme: getThemeName(state)
  });

  return connect(mapStateToProps)(ThemeHOC);
}
