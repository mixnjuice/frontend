import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { getQueue } from 'selectors/toast';

export default function ToastDrawer() {
  const toasts = useSelector(getQueue);

  if (!Array.isArray(toasts) || toasts.length === 0) {
    return null;
  }

  return (
    <section className="toast-drawer">
      {toasts.map((toast) => {
        const { id, title, message, icon, show } = toast;

        return (
          <Toast key={id} show={show}>
            <Toast.Header>
              {icon && <FontAwesomeIcon icon={icon} />}
              <strong className="mr-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        );
      })}
    </section>
  );
}

ToastDrawer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      interval: PropTypes.number,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  )
};
