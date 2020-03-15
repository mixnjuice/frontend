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
    title: PropTypes.string.isRequired,
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
      title,
      value,
      variant
    } = this.props;

    let icon = '';

    switch (variant) {
      case 'check':
      default:
        icon = value ? ['fas', 'check-square'] : ['far', 'square'];
        break;
    }

    if (variant === 'switch') {
      return (
        <div>
          <label className="switch my-auto mx-1">
            <input type="checkbox" onChange={this.handleClick} name={title} />
            <span className="slider round"></span>
          </label>
        </div>
      );
    }

    if (iconOnly) {
      const classes = classNames(className, 'icon-toggle');

      return (
        <FontAwesomeIcon
          size="lg"
          {...iconProps}
          icon={icon}
          title={title}
          onClick={this.handleClick}
          className={classes}
        />
      );
    } else {
      const classes = classNames(className, 'btn-toggle');

      return (
        <Button
          {...buttonProps}
          title={title}
          onClick={this.handleClick}
          className={classes}
        >
          <FontAwesomeIcon size="lg" {...iconProps} icon={icon} />
        </Button>
      );
    }
  }
}
