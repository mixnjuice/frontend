import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { actions } from 'reducers/application';

export default function ErrorFallback({ resetErrorBoundary }) {
  const dispatch = useDispatch();
  const handleReset = useCallback(() => {
    dispatch(actions.initApp());
    resetErrorBoundary();
  }, [dispatch, resetErrorBoundary]);

  return (
    <Container className="error-fallback text-center">
      <h1>Something went wrong.</h1>
      <Button variant="primary" onClick={handleReset}>
        Reload
      </Button>
    </Container>
  );
}

ErrorFallback.propTypes = {
  resetErrorBoundary: PropTypes.func.isRequired
};
