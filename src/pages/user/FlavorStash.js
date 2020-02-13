import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStash, isLoaded } from 'selectors/flavor';
import { actions as flavorActions } from 'reducers/flavor';

export class FlavorStash extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      requestStash: PropTypes.func.isRequired
    }).isRequired,
    stash: PropTypes.arrayOf(PropTypes.object),
    stashLoaded: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { actions, stashLoaded } = this.props;

    if (!stashLoaded) {
      actions.requestStash();
    }
  }

  render() {
    const { stash } = this.props;

    const hasStash = Array.isArray(stash) && stash.length;

    return (
      <Container>
        <Helmet title="User Flavor Stash" />
        <Table striped hover>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Flavor</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            {hasStash ? (
              stash.map((flavor, index) => (
                <tr key={index}>
                  <td>{flavor?.Flavor?.Vendor?.code}</td>
                  <td>{flavor?.Flavor.name}</td>
                  <td>{dayjs(flavor?.created).format('YYYY-MM-DD')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No flavors in stash.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stash: getStash(state),
  stashLoaded: isLoaded(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(flavorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FlavorStash);
