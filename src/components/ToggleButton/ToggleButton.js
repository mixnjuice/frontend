import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const toggleButtonProps = {
  variants: ['check', 'circle', 'switch', 'grid-list']
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

  renderSwitch(classes, value, title) {
    const joinedClasses = classNames(classes, 'slider round');

    return (
      <label className="switch my-auto mx-1">
        <input
          type="checkbox"
          checked={value}
          onChange={this.handleClick}
          name={title}
        />
        <span className={joinedClasses}></span>
      </label>
    );
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
      const classes = classNames(className, 'slider round');

      return this.renderSwitch(classes, value, title);
    }

    if (variant === 'grid-list') {
      const classes = classNames(className, 'slider slider-teal round');

      return (
        <div className="grid-list">
          <FontAwesomeIcon icon={['fas', 'list']} className="grid-list--icon" />
          {this.renderSwitch(classes, value, title)}
          <FontAwesomeIcon icon={['fas', 'th']} className="grid-list--icon" />
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
