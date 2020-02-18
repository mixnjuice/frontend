import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Container, Row } from 'react-bootstrap';

const defaultState = {
  limit: 20,
  page: 1
};

export const pagination = WrappedComponent =>
  class extends Component {
    static displayName = 'Pagination';
    static propTypes = {
      actions: PropTypes.object.isRequired,
      collection: PropTypes.array,
      pager: PropTypes.object,
      request: PropTypes.string.isRequired
    };

    constructor(props) {
      super(props);

      this.state = defaultState;
      this.handlePageChange = this.changePage.bind(this);
      this.handleLimitChange = this.changeLimit.bind(this);
      this.handleLimitUpdate = this.updateLimit.bind(this);
    }

    componentDidMount() {
      const { actions, request } = this.props;

      actions[request](defaultState);
    }

    pagerCounter() {
      const { pages } = this.props.pager;

      return [...Array(pages).keys()].map(value => value + 1);
    }

    changePage(page) {
      const { actions, pager, request } = this.props;
      const {
        target: { value }
      } = page;

      this.setState({ page: value });
      actions[request]({ ...pager, page: Number(value) });
    }

    changeLimit(limit) {
      const {
        target: { value }
      } = limit;

      this.setState({ limit: value });
    }

    updateLimit() {
      const { actions, pager, request } = this.props;
      const { limit } = this.state;

      actions[request]({ ...pager, limit: Number(limit) });
    }

    navigation() {
      return (
        <Container fluid={true}>
          <Row className="pb-2">
            <Col xs={3}>
              <input
                type="number"
                min="20"
                max="200"
                step="20"
                className="form-control"
                onChange={this.handleLimitChange}
                onBlur={this.handleLimitUpdate}
                value={this.state.limit}
              />
            </Col>
            <Col className="text-right">
              <select
                value={this.state.page}
                onChange={this.handlePageChange}
                onBlur={this.handlePageChange}
              >
                {this.pagerCounter().map((value, i) => (
                  <option value={value} key={i}>
                    Page {value}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Container>
      );
    }

    render() {
      const { collection, pager } = this.props;

      return (
        <WrappedComponent
          collection={collection}
          pager={pager}
          pagerNavigation={this.navigation()}
          {...this.props}
        />
      );
    }
  };

export const mapStateToProps = (dataSelector, pagerSelector) => state => ({
  collection: dataSelector(state),
  pager: pagerSelector(state)
});

export const mapDispatchToProps = action => dispatch => ({
  actions: bindActionCreators(action, dispatch)
});

export const withPagination = (
  action,
  dataSelector,
  pagerSelector
) => WrappedComponent =>
  connect(
    mapStateToProps(dataSelector, pagerSelector),
    mapDispatchToProps(action)
  )(pagination(WrappedComponent));

// export default withPagination;

export class PagerInfo extends Component {
  static propTypes = {
    contentType: PropTypes.string.isRequired,
    pager: PropTypes.object.isRequired
  };

  render() {
    const {
      contentType,
      pager: { count, pages }
    } = this.props;

    return (
      <Container fluid={true}>
        <Row>
          <Col>
            {count} {contentType}
          </Col>
          <Col className="text-right">{pages} Pages</Col>
        </Row>
      </Container>
    );
  }
}
