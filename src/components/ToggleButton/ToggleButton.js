import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const toggleButtonProps = {
  variants: ['check', 'circle', 'switch', 'grid-list']
};

const propTypes = {
  className: PropTypes.string,
  buttonProps: PropTypes.object,
  iconProps: PropTypes.object,
  title: PropTypes.string.isRequired,
  value: PropTypes.bool,
  iconOnly: PropTypes.bool,
  variant: PropTypes.oneOf(toggleButtonProps.variants),
  onClick: PropTypes.func
};

const propTypesWithIcon = {
  ...propTypes,
  icon: PropTypes.arrayOf(PropTypes.string).isRequired
};

const defaultProps = {
  buttonProps: {},
  iconProps: {},
  value: false,
  variant: 'check'
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

IconOnly.propTypes = propTypesWithIcon;
IconOnly.defaultProps = defaultProps;

function Switch(props) {
  const { className, value, title, onClick } = props;

  return (
    <label className="switch my-auto mx-1">
      <input type="checkbox" checked={value} onChange={onClick} name={title} />
      <span className={classNames(className, 'slider slider--round')}></span>
    </label>
  );
}

Switch.propTypes = propTypesWithIcon;
Switch.defaultProps = defaultProps;

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

GridList.propTypes = propTypesWithIcon;
GridList.defaultProps = defaultProps;

function ButtonElement(props) {
  const { buttonProps, className, iconProps, title, icon, onClick } = props;

  return (
    <Button
      {...buttonProps}
      data-testid="toggle-button"
      title={title}
      onClick={onClick}
      className={classNames(className, 'btn-toggle')}
    >
      <FontAwesomeIcon size="lg" {...iconProps} icon={icon} />
    </Button>
  );
}

ButtonElement.propTypes = propTypesWithIcon;
ButtonElement.defaultProps = defaultProps;

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

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;
