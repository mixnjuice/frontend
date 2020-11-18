import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const toggleButtonProps = {
  variants: ['check', 'circle', 'switch', 'grid-list']
};

function IconOnly({ icon, iconProps, title, onClick, className }) {
  return (
    <FontAwesomeIcon
      size="lg"
      {...iconProps}
      icon={icon}
      title={title}
      onClick={onClick}
      className={classNames(className, 'icon-toggle')}
    />
  );
}

function Switch(props) {
  const { className, value, title, onClick } = props;

  return (
    <label className="switch my-auto mx-1">
      <input type="checkbox" checked={value} onChange={onClick} name={title} />
      <span className={classNames(className, 'slider slider--round')}></span>
    </label>
  );
}

function GridList(props) {
  const { className } = props;

  return (
    <div className="slider--grid-list">
      <FontAwesomeIcon
        icon={['fas', 'list']}
        className="slider-icon--grid-list"
      />
      <Switch {...props} className={classNames(className, 'slider--teal')} />
      <FontAwesomeIcon
        icon={['fas', 'th']}
        className="slider-icon--grid-list"
      />
    </div>
  );
}

function ButtonElement(props) {
  const { buttonProps, className, iconProps, title, icon, onClick } = props;
  const classes = classNames(className, 'btn-toggle');

  return (
    <Button
      {...buttonProps}
      data-testid="toggle-button"
      title={title}
      onClick={onClick}
      className={classes}
    >
      <FontAwesomeIcon size="lg" {...iconProps} icon={icon} />
    </Button>
  );
}

export default function ToggleButton(props) {
  const { iconOnly, variant, value, onClick } = props;

  const derivedProps = {
    ...props,
    icon: value ? ['fas', 'check-square'] : ['far', 'square'],
    onClick: (event) => onClick && onClick(event)
  };

  if (iconOnly) {
    return <IconOnly {...derivedProps} />;
  }

  switch (variant) {
    case 'switch':
      return <Switch {...derivedProps} />;
    case 'grid-list':
      return <GridList {...derivedProps} />;
    default:
      return <ButtonElement {...derivedProps} />;
  }
}

IconOnly.propTypes = Switch.propTypes = GridList.propTypes = ButtonElement.propTypes = ToggleButton.propTypes = {
  className: PropTypes.string,
  buttonProps: PropTypes.object,
  iconProps: PropTypes.object,
  title: PropTypes.string.isRequired,
  value: PropTypes.bool,
  iconOnly: PropTypes.bool,
  variant: PropTypes.oneOf(toggleButtonProps.variants),
  onClick: PropTypes.func
};

IconOnly.defaultProps = Switch.defaultProps = GridList.defaultProps = ButtonElement.defaultProps = ToggleButton.defaultProps = {
  buttonProps: {},
  iconProps: {},
  value: false,
  variant: 'check'
};
