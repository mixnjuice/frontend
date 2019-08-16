import React from 'react';
import PropTypes from 'prop-types';

export function FontAwesomeIcon({ icon }) {
  const iconClass = Array.isArray(icon) ? icon.join('-') : icon;

  return <i className={`fa ${iconClass}`} />;
}

FontAwesomeIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
};
