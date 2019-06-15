import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Container } from 'react-bootstrap';

export class UserRecipes extends Component {
  render() {
    return (
      <Container>
        <h1>User Recipes</h1>
      </Container>
    );
  }
}

export default connect(
  null,
  null
)(UserRecipes);
