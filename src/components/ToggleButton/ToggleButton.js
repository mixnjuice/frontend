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
    const joinedClasses = classNames(classes, 'slider slider--round');

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

  renderGridList(classes, value, title) {
    const joinedClasses = classNames(classes, 'slider--teal');

    return (
      <div className="slider--grid-list">
        <FontAwesomeIcon
          icon={['fas', 'list']}
          className="slider-icon--grid-list"
        />
        {this.renderSwitch(joinedClasses, value, title)}
        <FontAwesomeIcon
          icon={['fas', 'th']}
          className="slider-icon--grid-list"
        />
      </div>
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
      return this.renderSwitch(className, value, title);
    }

    if (variant === 'grid-list') {
      return this.renderGridList(className, value, title);
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
