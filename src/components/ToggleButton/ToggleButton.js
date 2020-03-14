import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const toggleButtonProps = {
  variants: ['check', 'circle', 'switch']
};

export default class ToggleButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    buttonProps: PropTypes.object,
    iconProps: PropTypes.object,
    value: PropTypes.bool,
    iconOnly: PropTypes.bool,
    variant: PropTypes.oneOf(toggleButtonProps.variants),
    onClick: PropTypes.func
  };

  static defaultProps = {
    buttonProps: {},
    iconProps: {},
    value: false,
    variant: 'check'
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onClick } = this.props;

    if (onClick) {
      onClick(event);
    }
  }

  render() {
    const {
      buttonProps,
      className,
      iconOnly,
      iconProps,
      value,
      variant
    } = this.props;

    if (!buttonProps.title) {
      buttonProps.title = 'Click to toggle';
    }

    let icon = '';

    switch (variant) {
      case 'switch':
        icon = value ? ['fas', 'toggle-on'] : ['fas', 'toggle-off'];
        break;
      case 'check':
      default:
        icon = value ? ['fas', 'check-square'] : ['far', 'square'];
        break;
    }
    if (iconOnly) {
      const classes = classNames(className, 'icon-toggle');

      return (
        <FontAwesomeIcon
          size="lg"
          {...iconProps}
          icon={icon}
          {...buttonProps}
          onClick={this.handleClick}
          className={classes}
        />
      );
    } else {
      const classes = classNames(className, 'btn-toggle');

      return (
        <Button {...buttonProps} onClick={this.handleClick} className={classes}>
          <FontAwesomeIcon size="lg" {...iconProps} icon={icon} />
        </Button>
      );
    }
  }
}
