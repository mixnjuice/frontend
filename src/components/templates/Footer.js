import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Col, Row } from 'react-bootstrap';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Footer extends Component {
  render() {
    return (
      <Row>
        <Col sm={12} style={{ textAlign: 'center' }}>
          Built with &nbsp;
          <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
          &nbsp; by the Gusta Project
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  null
)(Footer);
