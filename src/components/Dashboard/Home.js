import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';

export class Home extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Helmet title="Dashboard" />
        Dashboard Home
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(Home);
