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

  get icon() {
    return this.props.value ? ['fas', 'check-square'] : ['far', 'square'];
  }

  handleClick(event) {
    const { onClick } = this.props;

    if (onClick) {
      onClick(event);
    }
  }

  switch(classes) {
    const { className, value, title } = this.props;
    const joinedClasses = classNames(
      className,
      classes,
      'slider slider--round'
    );

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

  get gridList() {
    return (
      <div className="slider--grid-list">
        <FontAwesomeIcon
          icon={['fas', 'list']}
          className="slider-icon--grid-list"
        />
        {this.switch('slider--teal')}
        <FontAwesomeIcon
          icon={['fas', 'th']}
          className="slider-icon--grid-list"
        />
      </div>
    );
  }

  get button() {
    const { buttonProps, className, iconProps, title } = this.props;
    const classes = classNames(className, 'btn-toggle');

    return (
      <Button
        {...buttonProps}
        data-testid="toggle-button"
        title={title}
        onClick={this.handleClick}
        className={classes}
      >
        <FontAwesomeIcon size="lg" {...iconProps} icon={this.icon} />
      </Button>
    );
  }

  get iconOnly() {
    const { className, iconProps, title } = this.props;
    const classes = classNames(className, 'icon-toggle');

    return (
      <FontAwesomeIcon
        size="lg"
        {...iconProps}
        icon={this.icon}
        title={title}
        onClick={this.handleClick}
        className={classes}
      />
    );
  }

  render() {
    const { iconOnly, variant } = this.props;

    if (iconOnly) {
      return this.iconOnly;
    }

    switch (variant) {
      case 'switch':
        return this.switch();
      case 'grid-list':
        return this.gridList;
      default:
        return this.button;
    }
  }
}
