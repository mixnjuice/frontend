import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import Header from '../Header/Header';
import './LazyLoaderFallback.scss';

export default class LazyLoaderFallback extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="loading__overlay">
          <div className="loading__content m-auto">
            <Spinner animation="border" role="status" />
            <div className="loading__text">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
