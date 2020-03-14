import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const toggleButtonProps = {
  variants: ['check']
};

export default class ToggleButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    buttonProps: PropTypes.object,
    iconProps: PropTypes.object,
    initialValue: PropTypes.bool,
    variant: PropTypes.oneOf(toggleButtonProps.variants),
    onClick: PropTypes.func
  };

  static defaultProps = {
    initialValue: false,
    variant: 'check'
  };

  constructor(props) {
    super(props);

    this.state = { value: this.props.initialValue };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onClick } = this.props;

    this.setState({ value: !this.state.value });

    if (onClick) {
      onClick(event);
    }
  }

  render() {
    const { value } = this.state;
    const { buttonProps, className, iconProps, variant } = this.props;

    let icon = '';

    switch (variant) {
      case 'check':
      default:
        icon = value ? ['fas', 'check-square'] : ['far', 'square'];
        break;
    }
    const classes = classNames(className, 'btn-toggle');

    return (
      <Button
        {...buttonProps}
        onClick={this.handleClick}
        className={classes}
        title="Click to toggle"
      >
        <FontAwesomeIcon size="lg" {...iconProps} icon={icon} />
      </Button>
    );
  }
}
