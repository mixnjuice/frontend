import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

export class Home extends Component {
  render() {
    return (
      <Container>
        <h1>Welcome!</h1>
        <div>Hello DIY World</div>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(Home);
