import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Container } from 'react-bootstrap';

import { actions as appActions } from 'reducers/application';
import { getUsers } from 'selectors/application';

export class Users extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <Container>
        <Helmet title="Users :: Dashboard" />
        {JSON.stringify(users)}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: getUsers(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
