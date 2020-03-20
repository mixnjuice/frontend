import { Component } from 'react';
import PropTypes from 'prop-types';
import { getThemeName } from 'selectors/theme';
import { connect } from 'react-redux';

export class ThemeContainer extends Component {
  static propTypes = {
    theme: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

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
    return null;
  }
}

export const mapStateToProps = state => ({
  theme: getThemeName(state)
});

export default connect(mapStateToProps)(ThemeContainer);
