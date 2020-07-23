import React from 'react';
import { Spinner } from 'react-bootstrap';

import Header from 'components/Header/Header';

export default function SuspenseFallback() {
  return (
    <div>
      <Header />
      <div className="loading__overlay">
        <div className="loading__content m-auto">
          <Spinner
            animation="border"
            role="status"
            className="loading__spinner"
          />
          <div className="loading__text">
            <span>Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
