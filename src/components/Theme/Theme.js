import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getThemeName } from 'selectors/theme';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';

export const theme = WrappedComponent =>
  class extends Component {
    static displayName = 'Theme';
    static propTypes = {
      theme: PropTypes.string
    };
    render() {
      return (
        <BodyClassName className={'theme--' + this.props.theme}>
          <WrappedComponent {...this.props} />
        </BodyClassName>
      );
    }
  };

export const mapStateToProps = state => ({
  theme: getThemeName(state)
});

export const withTheme = WrappedComponent =>
  connect(mapStateToProps)(theme(WrappedComponent));
