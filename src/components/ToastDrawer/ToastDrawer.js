import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getToasts } from 'selectors/application';

export class ToastDrawer extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      hideToast: PropTypes.func.isRequired
    }),
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

  render() {
    const { toasts } = this.props;

    if (!Array.isArray(toasts) || toasts.length === 0) {
      return null;
    }

    return (
      <section className="toast-drawer">
        {toasts.map(toast => {
          const { id, title, message, icon, show } = toast;

          return (
            <Toast key={id} show={show}>
              <Toast.Header>
                {icon && <FontAwesomeIcon icon={toast.icon} />}
                <strong className="mr-auto">{title}</strong>
              </Toast.Header>
              <Toast.Body>{message}</Toast.Body>
            </Toast>
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  toasts: getToasts(state)
});

export default connect(
  mapStateToProps,
  null
)(ToastDrawer);