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

  renderButton() {
    const { buttonProps, className, iconProps, title, value } = this.props;
    const icon = value ? ['fas', 'check-square'] : ['far', 'square'];
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

  renderIcon() {
    const { className, iconProps, title, value, variant } = this.props;

    let icon = '';
    const classes = classNames(className, 'icon-toggle');

    switch (variant) {
      case 'check':
      default:
        icon = value ? ['fas', 'check-square'] : ['far', 'square'];
        break;
    }

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
  }

  render() {
    const { iconOnly, variant, className, value, title } = this.props;

    if (iconOnly) {
      return this.renderIcon();
    }

    switch (variant) {
      case 'switch':
        return this.renderSwitch(className, value, title);
      case 'grid-list':
        return this.renderGridList(className, value, title);
      default:
        return this.renderButton();
    }
  }
}
